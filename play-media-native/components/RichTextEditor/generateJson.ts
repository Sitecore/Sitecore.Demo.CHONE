import { DOMParser, Schema } from 'prosemirror-model';
import { nodes, marks } from 'prosemirror-schema-basic';
import { orderedList, bulletList, listItem } from 'prosemirror-schema-list';
import { parseHTML } from 'zeed-dom';

const generateJson = (data) => {
  const dom = parseHTML(data) as unknown as Node;

  const myNodes = {
    doc: nodes.doc,
    paragraph: { ...nodes.paragraph, parseDOM: [{ tag: 'p' }, { tag: 'br' }] },
    blockquote: nodes.blockquote,
    horizontalRule: nodes.horizontal_rule,
    heading: nodes.heading,
    codeBlock: nodes.code_block,
    text: nodes.text,
    image: nodes.image,
    listItem: { ...listItem, content: 'paragraph block*' },
    orderedList: { ...orderedList, content: 'listItem+', group: 'block' },
    bulletList: { ...bulletList, content: 'listItem+', group: 'block' },
  };

  const myMarks = {
    link: marks.link,
    italic: marks.em,
    bold: marks.strong,
    code: marks.code,
    strike: {
      ...marks.code,
      parseDOM: [{ tag: 'strike' }],
    },
  };

  const mySchema = new Schema({
    nodes: myNodes,
    marks: myMarks,
  });

  const result = DOMParser.fromSchema(mySchema).parse(dom).toJSON();
  return result;
};

export default generateJson;
