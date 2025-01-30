"use client";
import { useEffect, useState, useCallback } from "react";
import throttle from "lodash.throttle";

interface Position {
  lat: number;
  lng: number;
}

const useGPS = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [path, setPath] = useState<Position[]>([]);

  const updatePosition = useCallback(
    throttle((newPosition: Position) => {
      setPosition(newPosition);
      console.log("newPosition", newPosition);
      setPath((prevPath) => [...prevPath, newPosition]);
    }, 1000),
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          updatePosition(newPosition);
        },
        (error) => {
          console.error("Error fetching position", error);
        },
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        updatePosition.cancel();
      };
    }
  }, [updatePosition]);

  return { position, path };
};

export default useGPS;
