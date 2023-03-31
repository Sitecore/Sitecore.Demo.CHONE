export interface RichTextBody {
  type: string;
  content: any[];
}

export interface RichTextResponseItem {
  body: RichTextBody;
}

export type RichTextResponse = RichTextResponseItem[];
