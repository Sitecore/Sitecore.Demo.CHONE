import { exec } from 'child_process';
import fs from 'fs';

// Iterate recursively in order to retrieve all content item IDs
const walk = (dir: fs.PathLike) => {
  let results: unknown[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push({
        contentItemID: file
          .split(/(\\|\/)/g)
          .pop()
          ?.split('.')[0],
        contentType: dir
          .toString()
          .split(/(\\|\/)/g)
          .pop()
      });
    }
  });
  return results;
};
const contentItemIDs = walk(`${__dirname}/../items/contentItems`);

// Publish each content item
contentItemIDs.forEach((contentItem: any) => {
  console.log(`Publishing of '${contentItem.contentType}' content item '${contentItem.contentItemID}' initiated`);
  exec(`ch-one-cli delivery content publish -i ${contentItem.contentItemID} -c ${contentItem.contentType}`);
});
