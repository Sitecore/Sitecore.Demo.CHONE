export enum RichTextContentTypeLabels {
  paragraph = 'paragraph',
  heading = 'heading',
  link = 'link',
}

export type RichTextContentTypes = RichTextParagraph | RichTextHeading;

export interface RichTextContent {
  type: RichTextContentTypeLabels;
  content: Array<RichTextContentTypes>;
}
