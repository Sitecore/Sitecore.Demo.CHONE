export interface Location {
  id: string;
  title: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

export interface AllLocationResponse {
  data: {
    allLocation: {
      results: Partial<Location>[];
    };
  };
}
