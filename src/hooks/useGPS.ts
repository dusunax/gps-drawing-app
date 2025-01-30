// app/hooks/useGPS.ts
"use client";
import { useEffect, useState } from "react";

interface Position {
  lat: number;
  lng: number;
}

const useGPS = () => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching position", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return position;
};

export default useGPS;
