"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import throttle from "lodash.throttle";

const seoulCenter = { lat: 37.5665, lng: 126.978 };

interface MapComponentProps {
  onFinishDrawing: (positions: google.maps.LatLngLiteral[]) => void;
}

const isBrowser = typeof window !== "undefined";
export default function MapComponent({ onFinishDrawing }: MapComponentProps) {
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const [currentPosition, setCurrentPosition] =
    useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // 쓰로틀링 적용된 위치 업데이트 함수
  const handlePositionChange = throttle(
    (position: google.maps.LatLngLiteral) => {
      setCurrentPosition(position);
      setPath((prevPath) => [...prevPath, position]);
    },
    1000
  ); // 1초 간격으로 제한

  // GPS 위치 추적
  useEffect(() => {
    if (isBrowser && navigator.geolocation) {
      console.log("navigator.geolocation", navigator.geolocation);
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          handlePositionChange(newPosition); // 쓰로틀링 적용
        },
        (error) => {
          console.error("Error fetching position", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [handlePositionChange]);

  const handleFinishDrawing = () => {
    onFinishDrawing(path);
  };

  return isLoaded ? (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
        }}
        center={currentPosition || seoulCenter}
        zoom={15}
      >
        {/* 현재 위치 마커 */}
        {currentPosition && <Marker position={currentPosition} />}

        {/* 이동 경로 폴리라인 */}
        <Polyline
          path={path}
          options={{ strokeColor: "#FF0000", strokeWeight: 6 }}
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
