"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { differenceInSeconds } from "date-fns";
import throttle from "lodash.throttle";
import type { Position } from "@/types/drawing";
import { haversineDistance } from "@/utils/haversine-distance";
import { fixedNumber } from "@/utils/fixed-number";

interface UseGPSProps {
  isRecording: boolean;
}

const useGPS = ({ isRecording }: UseGPSProps) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [path, setPath] = useState<Position[]>([]);

  const resetPath = () => {
    setPath([]);
  };

  const totalTime = useMemo(() => {
    if (path.length < 2) return 0;
    const startTime = path[0].timestamp;
    const endTime = path[path.length - 1].timestamp;

    return fixedNumber(
      differenceInSeconds(new Date(endTime), new Date(startTime)) / 60,0
    );
  }, [path]);

  const totalDistance = useMemo(() => {
    return path.length > 1
      ? fixedNumber(
          haversineDistance(
            path[path.length - 1].lat,
            path[path.length - 1].lng,
            path[0].lat,
            path[0].lng
          ),
          2
        )
      : 0;
  }, [path]);
  const totalPoints = useMemo(() => {
    return fixedNumber((path.length * Number(totalTime)) / 15);
  }, [path, totalTime]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePosition = useCallback(
    throttle((newPosition: Position) => {
      setPosition(newPosition);
      const isSamePosition =
        path.length > 0 &&
        path[path.length - 1].lat === newPosition.lat &&
        path[path.length - 1].lng === newPosition.lng;

      if (!isRecording || isSamePosition) {
        return;
      }

      setPath((prevPath) => [...prevPath, newPosition]);
    }, 5000),
    [isRecording]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            timestamp: pos.timestamp,
          };
          updatePosition(newPosition);
        },
        (error) => {
          console.error("Error fetching position", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        updatePosition.cancel();
      };
    }
  }, [updatePosition]);

  return { position, path, resetPath, totalTime, totalDistance, totalPoints };
};

export default useGPS;
