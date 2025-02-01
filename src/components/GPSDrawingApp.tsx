"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navigation2, ArrowDownToLine, Images, Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MapComponent from "./MapComponent";
import useGPS from "@/hooks/use-GPS";
import useImageSaver from "@/hooks/use-image-saver";
import Image from "next/image";
import Link from "next/link";
import { DrawingInputs } from "@/types/drawing";

interface SavedImage {
  id: string;
  imageUrl: string;
}

const GPSDrawingApp = ({ drawingInputs }: { drawingInputs: DrawingInputs }) => {
  const [isRecording, setIsRecording] = useState(true);
  const { position, path, totalTime, totalDistance, totalPoints } = useGPS({
    isRecording,
  });
  const isGPSActive = position !== null;

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { handleSaveImage, isSaving } = useImageSaver({
    imageContainerRef,
    enrich: {
      distance: totalDistance,
      duration: totalTime,
      points: totalPoints,
    },
    title: drawingInputs.title,
    description: drawingInputs.description,
  });
  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);

  const handleSaveButtonClick = async () => {
    const result = await handleSaveImage();
    if (result.ok) {
      const { imageUrl, id } = result.data as SavedImage;
      setSavedImages((prev) => [...prev, { id, imageUrl }]);
    }
  };

  useEffect(() => {
    if (isSaving) {
      toast({
        title: "잠시만 기다려주세요😴",
        description: "이미지를 저장 중입니다",
        duration: 3000,
      });
    }
  }, [isSaving]);

  return (
    <>
      <div className="relative h-[calc(100vh-200px)] bg-dark-background">
        <MapComponent
          position={position}
          path={path}
          imageContainerRef={imageContainerRef}
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-dark-surface bg-opacity-90 px-3 py-2 rounded-full">
          <Navigation2
            className={`w-3 h-3 ${
              isGPSActive
                ? isRecording
                  ? "text-status-success animate-gps-signal"
                  : "text-text-secondary"
                : "text-status-error"
            }`}
          />
          <span className="text-xs">
            {isGPSActive
              ? isRecording
                ? "GPS Active"
                : "Paused"
              : "No Signal"}
          </span>
        </div>

        {/* Distance Card */}
        <div className="absolute top-4 left-4 bg-dark-surface bg-opacity-90 p-4 rounded-lg shadow-float">
          <span className="text-text-secondary text-sm">DISTANCE</span>
          <p className="text-brand-primary text-md font-bold">
            {totalDistance} km
          </p>
        </div>
      </div>

      {/* Bottom Control Panel */}
      <div className="relative h-bottom-panel -mt-10 bg-dark-surface flex flex-col justify-between gap- rounded-t-3xl px-6 py-6 shadow-float">
        {/* Stats Row */}
        <div className="flex justify-between">
          {/* Time */}
          <div className="text-center flex flex-col items-center min-w-20">
            <div className="w-12 h-12 rounded-full bg-dark-button flex items-center justify-center mb-1 shadow-button">
              <span
                className={`text-stats ${
                  Number(totalTime) > 0 ? "text-status-success" : ""
                }`}
              >
                {totalTime}
              </span>
            </div>
            <span className="text-text-secondary text-label">MIN</span>
          </div>

          {/* Saved Images Draw Toggle */}
          <div className="text-center flex flex-col items-center min-w-20 relative">
            <div className="w-12 h-12 rounded-full bg-dark-button flex items-center justify-center mb-1 shadow-button">
              <span
                className={`text-stats ${
                  savedImages.length > 0 ? "text-status-success" : ""
                }`}
              >
                {savedImages.length}
              </span>
            </div>
            <span className="text-text-secondary text-label">IMAGES</span>

            {/* saved images */}
            {savedImages.length > 0 && (
              <div className="absolute w-[96vw] left-1/2 -translate-x-1/2 -top-[100%] -mt-4 bg-dark-button bg-opacity-90 px-6 py-2 rounded-2xl shadow-float z-50">
                <h2 className="text-xs font-semibold">Drawings</h2>
                <ul className="flex gap-2">
                  {savedImages.map(({ id, imageUrl }) => (
                    <li
                      key={id}
                      className="h-10 w-10 relative bg-text-secondary rounded-md overflow-hidden cursor-pointer"
                      onClick={() => {
                        window.open(imageUrl, "_blank");
                      }}
                    >
                      <Image
                        src={imageUrl}
                        alt="saved-image"
                        fill
                        sizes="100px"
                        quality={80}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Points */}
          <div className="text-center flex flex-col items-center min-w-20">
            <div className="w-12 h-12 rounded-full bg-dark-button flex items-center justify-center mb-1 shadow-button">
              <span
                className={`text-stats ${
                  totalPoints > 0 ? "text-status-success" : ""
                }`}
              >
                {totalPoints}
              </span>
            </div>
            <span className="text-text-secondary text-label">POINTS</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-between items-center px-6">
          {/* Reset Button */}
          <Link
            className={`w-16 h-16 rounded-full bg-dark-button flex items-center justify-center shadow-button hover:bg-opacity-80 transition-colors
            ${!path.length ? "opacity-50" : ""}`}
            href="/drawing-list"
          >
            <Images className="w-6 h-6" />
          </Link>

          {/* Record Button */}
          <button
            className="w-16 h-16 rounded-full relative shadow-button"
            onClick={() => setIsRecording(!isRecording)}
          >
            <span className="invisible">RECORD</span>
            <div
              className={`absolute inset-0 rounded-full ${
                isRecording ? "animate-recording-pulse" : ""
              } 
              ${isRecording ? "bg-brand-primary" : "bg-text-secondary"}`}
            ></div>
            <div className="absolute inset-1 bg-dark-surface rounded-full"></div>
            <div
              className={`absolute inset-2 rounded-full transition-all duration-200
              ${isRecording ? "bg-brand-primary" : "bg-text-secondary"}`}
            ></div>
          </button>

          {/* Save Button */}
          <button
            className={`w-16 h-16 rounded-full bg-dark-button flex items-center justify-center shadow-button hover:bg-opacity-80 transition-colors
            ${isSaving ? "!bg-text-disabled animate-spin" : ""}`}
            onClick={handleSaveButtonClick}
            disabled={isSaving}
            style={{
              animationDuration: "1.5s",
            }}
          >
            {isSaving ? (
              <Loader className="w-6 h-6" />
            ) : (
              <ArrowDownToLine className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default GPSDrawingApp;
