"use client";
import React, { useRef, useState } from "react";
import { Navigation2, RotateCcw, ArrowDownToLine, Logs } from "lucide-react";
import MapComponent from "./MapComponent";
import useGPS from "@/hooks/use-GPS";
import useImageSaver from "@/hooks/use-image-saver";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

interface SavedImage {
  id: string;
  imageUrl: string;
}

const GPSDrawingApp = () => {
  const { position, path, resetPath } = useGPS();
  const isGPSActive = position !== null;
  const [isRecording, setIsRecording] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { handleSaveImage, isSaving, saveImageLocally } = useImageSaver({
    imageContainerRef,
  });

  const [savedImages, setSavedImages] = useState<SavedImage[]>([]);

  const totalDistance = 0;
  const totalPoints = path.length; // 경로의 점 개수
  const totalTime = 0;

  const handleSaveButtonClick = async () => {
    const result = await handleSaveImage();
    console.log(result);
    if (result.ok) {
      const { imageUrl, id } = result.data as SavedImage;
      setSavedImages((prev) => [...prev, { id, imageUrl }]);
    }
  };

  return (
    <div className="h-screen bg-dark-background text-text-primary">
      <nav className="h-nav bg-dark-surface px-6 flex items-center justify-between shadow-float">
        <h1 className="text-md font-semibold">GPS Drawing</h1>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition-colors">
          <Logs className="w-5 h-5" />
        </button>
      </nav>

      {/* Map Area */}
      <div className="relative h-[calc(100vh-200px)] bg-dark-background">
        {/* GPS Signal Indicator */}
        <MapComponent
          position={position}
          path={path}
          imageContainerRef={imageContainerRef}
        />
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-dark-surface bg-opacity-90 px-3 py-2 rounded-full">
          <Navigation2
            className={`w-3 h-3 ${
              isGPSActive
                ? "text-status-success animate-gps-signal"
                : "text-status-error"
            }`}
          />
          <span className="text-xs">
            {isGPSActive ? "GPS Active" : "No Signal"}
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
                  totalTime > 0 ? "text-status-success" : ""
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
                      onClick={() => saveImageLocally(imageUrl)}
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
        <div className="flex justify-between items-center px-4">
          {/* Reset Button */}
          <button
            className={`w-16 h-16 rounded-full bg-dark-button flex items-center justify-center shadow-button hover:bg-opacity-80 transition-colors
            ${!path.length ? "opacity-50" : ""}`}
            onClick={() => {
              if (path.length) {
                resetPath();
                toast({
                  title: "Reset Path",
                  description: "Path has been reset.",
                  variant: "destructive",
                  duration: 2000,
                });
              }
            }}
            disabled={!path.length}
          >
            <RotateCcw className="w-6 h-6" />
          </button>

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
            ${isSaving ? "!bg-text-disabled animate-pulse" : ""}`}
            onClick={handleSaveButtonClick}
            disabled={isSaving}
          >
            <ArrowDownToLine className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GPSDrawingApp;
