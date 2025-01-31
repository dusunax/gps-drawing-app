"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { Position } from "@/hooks/useGPS";

const seoulCenter = { lat: 37.5665, lng: 126.978 };

interface MapComponentProps {
  position: Position | null;
  path: Position[];
}

export default function MapComponent({ position, path }: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (isLoaded && map && position) {
      map.setCenter(position);
    }
  }, [isLoaded, map, position]);

  return isLoaded ? (
    <div className="relative w-full h-full">
      <GoogleMap
        center={position || seoulCenter}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(mapInstance) => setMap(mapInstance)}
        options={{
          disableDefaultUI: true,
        }}
      >
        {position && <Marker position={position} />}
        <Polyline
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 10,
          }}
        />
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}