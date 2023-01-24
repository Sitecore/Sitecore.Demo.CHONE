import { RichTextContentTypeLabels } from '../content';

export interface RichTextLinkAttributes {
  href: string;
  target: string;
  class: string | null;
}

export type RichTextLinkMark = Array<{
  type: RichTextContentTypeLabel.link;
  attrs: RichTextLinkAttributes;
}>;
