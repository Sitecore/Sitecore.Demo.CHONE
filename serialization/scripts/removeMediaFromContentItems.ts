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

console.log('Removing media fields...');

// Find all content item paths
const contentItemPaths = walk(`${__dirname}/../items/contentItems`);

// Specify which fields should be removed from the yaml files
const keysToRemove = ['profilePhoto', 'featuredImage', 'relatedMedia'];

contentItemPaths.forEach((path) => {
  try {
    const doc = yaml.load(fs.readFileSync(path, 'utf8'));

    // Remove the media fields (that currently cannot be serialized using the Content Hub ONE CLI)
    // from each content item's yaml file
    let edited = yaml.dump(doc, {
      replacer: (key, value) => (keysToRemove.includes(key) ? undefined : value),
      noArrayIndent: true,
      lineWidth: -1,
    });

    // Remove single quotes around IDs
    edited = edited.replace(/^(id: )'([^']+)'/g, '$1$2');

    // Convert '|-' back to '>-'
    edited = edited.replace(/^(\s*- )\|-/gm, '$1>-');
    edited = edited.replace(/^(\s*value: )\|-/gm, '$1>-');

    // Convert LF line endings back to CRLF
    edited = edited.replace(/\n(?<!\r\n)/g, '\r\n');

    // Rewrite the file with a UTF8 byte order mark (BOM) prefix
    fs.writeFileSync(path, `\ufeff${edited}`, { encoding: 'utf8' });
  } catch (e) {
    console.log(e);
  }
});

export {};
