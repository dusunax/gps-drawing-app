"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import type { Position } from "@/types/drawing";
import { getRainbowColor } from "@/utils/get-rainbow-color";

const seoulCenter = { lat: 37.5665, lng: 126.978 };

interface MapComponentProps {
  position: Position | null;
  path: Position[];
  imageContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function MapComponent({
  position,
  path,
  imageContainerRef,
}: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [color, setColor] = useState(getRainbowColor());
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(getRainbowColor({ speed: 3 }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (map) {
      setPolyline(
        new google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: color,
          strokeOpacity: 0.5,
          strokeWeight: 10,
        })
      );
    }
  }, [map, color, path]);

  useEffect(() => {
    if (isLoaded && map && position) {
      map.setCenter(position);
    }
  }, [isLoaded, map, position]);

  if (!isLoaded) {
    return <div className="relative w-full h-full rounded-lg bg-[#f6f3f3]" />;
  }

  return (
    <div
      className="relative w-full h-full bg-[#f6f3f3]"
      ref={imageContainerRef}
    >
      <GoogleMap
        center={position || seoulCenter}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(mapInstance) => setMap(mapInstance)}
        options={{
          disableDefaultUI: true,
        }}
      >
        {position && (
          <Marker
            position={position}
            icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
            title="Your current location"
          />
        )}
        {(polyline && polyline.setMap(map)) || null}
      </GoogleMap>
    </div>
  );
}
