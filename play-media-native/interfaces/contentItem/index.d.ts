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

export interface IFieldOverride {
  defaultValue: any;
  referenceType?: string;
  required: boolean;
  renderItem: ReactNode;
  single: boolean;
  title: string;
  type: string;
}
