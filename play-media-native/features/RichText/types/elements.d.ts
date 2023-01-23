export interface RichTextTextElement {
  type: RichTextElementTypes.text;
  text: string;
  marks?: Array<RichTextElementMarks>;
}

export enum RichTextElementTypes {
  text = 'text',
}

export interface RichTextElement {
  type: RichTextElementTypes;
  content: Array<RichTextTextElement>;
}
