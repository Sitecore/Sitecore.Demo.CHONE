export interface RichTextTextElement {
  type: RichTextElementTypes.text;
  text: string;
  marks?: RichTextElementMarks[];
}

export enum RichTextElementTypes {
  text = 'text',
}

export interface RichTextElement {
  type: RichTextElementTypes;
  content: RichTextTextElement[];
}
