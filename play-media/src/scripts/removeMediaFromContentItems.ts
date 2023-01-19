import yaml from 'js-yaml';
import fs from 'fs';

const walk = (dir: fs.PathLike): fs.PathLike[] => {
  let results: unknown[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results as fs.PathLike[];
};

// Find all content item paths
const contentItemPaths = walk(`${__dirname}/../items/contentItems`);

// Specify which fields should be removed from the yaml files
const keysToRemove = ['profilePhoto', 'featuredImage', 'relatedMedia'];

contentItemPaths.forEach((path) => {
  try {
    const doc = yaml.load(fs.readFileSync(path, 'utf8'));

    // Remove the media fields (that currently cannot be serialized using the Content Hub ONE CLI)
    // from each content item's yaml file
    const edited = yaml.dump(doc, {
      replacer: (key, value) => (keysToRemove.includes(key) ? undefined : value),
    });

    fs.writeFileSync(path, edited);
  } catch (e) {
    console.log(e);
  }
});

export {};
