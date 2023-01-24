import { RichTextContent } from './content';

export interface RichTextBody {
  type: string;
  content: Array<any>;
}

export interface RichTextResponseItem {
  body: RichTextBody;
}

export type RichTextResponse = Array<RichTextResponseItem>;
