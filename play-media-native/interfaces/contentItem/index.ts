export interface ContentItem {
  id?: string;
  name: string;
  contentTypeId: string;
  fields: {
    [prop: string]: {
      value?: unknown;
    };
  };
}
