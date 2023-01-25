export interface Sport {
  id: string;
  title: string;
  description: string;
}

export interface AllSportsResponse {
  data: {
    allSport: {
      results: Partial<Sport>[];
    };
  };
}
