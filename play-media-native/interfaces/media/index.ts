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

// For images taken from Media Library or Camera (less props than CH1 Media)
//
export interface DeviceMedia {
  height: number;
  uri: string;
  width: number;
}
