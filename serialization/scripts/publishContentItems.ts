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
      results.push(
        file
          .split(/(\\|\/)/g)
          .pop()
          ?.split('.')[0]
      );
    }
  });
  return results;
};
const contentItemIDs = walk(`${__dirname}/../items/contentItems`);

// Publish each content item
contentItemIDs.forEach((contentItemID) => {
  exec(`ch-one-cli delivery content publish -i ${contentItemID}`);
});
