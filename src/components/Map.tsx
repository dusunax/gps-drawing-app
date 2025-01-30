"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import useGPS from "@hooks/useGPS";

const seoulCenter = { lat: 37.5665, lng: 126.978 };

interface MapComponentProps {
  onFinishDrawing: (positions: google.maps.LatLngLiteral[]) => void;
}

export default function MapComponent({ onFinishDrawing }: MapComponentProps) {
  const { position, path } = useGPS();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const handleFinishDrawing = () => {
    onFinishDrawing(path);
  };

  useEffect(() => {
    if (isLoaded && map && position) {
      map.setCenter(position);
    }
  }, [isLoaded, map, position]);

  return isLoaded ? (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <GoogleMap
        center={position || seoulCenter}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(mapInstance) => setMap(mapInstance)}
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

      <button
        onClick={handleFinishDrawing}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        Finish Drawing
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}