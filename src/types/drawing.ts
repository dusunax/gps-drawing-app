export interface LatLng {
  lat: number;
  lng: number;
}

export interface Position {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface Drawing {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  description: string;
  id: string;
  imageUrl: string;
  title: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  userId: string;
  enrich?: DrawingEnrich;
}

export interface DrawingEnrich {
  distance: number;
  duration: number;
  points: number;
}

export interface DrawingInputs {
  title: string;
  description: string;
}
