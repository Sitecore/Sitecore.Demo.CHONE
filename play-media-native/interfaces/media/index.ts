export interface AllMediaResponse {
  data: {
    allMedia: {
      results: Partial<Media>[];
    };
  };
}

export interface Media {
  id: string;
  name: string;
  description: string;
  fileId: string;
  fileName: string;
  fileHeight: number;
  fileWidth: number;
  fileSize: number;
  fileType: string;
  fileUrl: string;
}
