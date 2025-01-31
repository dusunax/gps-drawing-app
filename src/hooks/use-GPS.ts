"use client";
import { useEffect, useState, useCallback } from "react";
import throttle from "lodash.throttle";

export interface Position {
  lat: number;
  lng: number;
}

const DUMMY_POSITION = {
  lat: 37.566535,
  lng: 126.977125,
};

const useGPS = () => {
  const [position, setPosition] = useState<Position | null>(DUMMY_POSITION);
  const [path, setPath] = useState<Position[]>([DUMMY_POSITION]);

  const resetPath = () => {
    setPath([]);
  };

  return { position, path, resetPath };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePosition = useCallback(
    throttle((newPosition: Position) => {
      setPosition(newPosition);
      console.log("newPosition", newPosition);
      setPath((prevPath) => [...prevPath, newPosition]);
    }, 5000),
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

  // return { position, path };
};

export default useGPS;
