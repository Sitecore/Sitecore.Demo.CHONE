export interface ContentItemCreate {
  id?: string;
  name: string;
  contentTypeId: string;
  fields: {
    [prop: string]: {
      value?: unknown;
    };
  };
}

export interface ContentItemUpdate {
  id: string;
  name: string;
  fields: {
    [prop: string]: {
      value?: unknown;
    };
  };
}
