export interface ContentBlock {
  id: string;
  title: string;
  body: any;
}

export interface AllContentBlockResponse {
  data: {
    allContentBlock: {
      results: Partial<ContentBlock>[];
    };
  };
}

export interface ContentBlockResponse {
  data: {
    contentBlock: Partial<ContentBlock>;
  };
}
