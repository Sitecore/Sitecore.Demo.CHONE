export interface RichTextLinkAttributes {
  href: string;
  target: string;
  class: string | null;
}

export type RichTextLinkMark = {
  type: RichTextContentTypeLabel.link;
  attrs: RichTextLinkAttributes;
}[];
