export interface LatLng {
  lat: number;
  lng: number;
}

export interface DrawingData {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  points: LatLng[];
  distance: number;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

export interface CreateDrawingRequest {
  title: string;
  description?: string;
  points: LatLng[];
  distance: number;
  duration: number;
  imageBase64?: string;
}

export interface UpdateDrawingRequest {
  id: string;
  title?: string;
  description?: string;
}
