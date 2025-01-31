"use client";
import React, { useState } from "react";
import { Navigation2, RotateCcw, ArrowDownToLine, Logs } from "lucide-react";
import MapComponent from "./Map";
import useGPS from "@/hooks/useGPS";

const GPSDrawingApp = () => {
  const { position, path } = useGPS();
  const [isRecording, setIsRecording] = useState(false);
  const isGPSActive = position !== null;

  const totalDistance = 0;
  const totalPoints = 0;
  const totalTime = 0;

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
        <MapComponent position={position} path={path} />
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
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-dark-button flex items-center justify-center mb-1 shadow-button">
              <span className="text-stats">{totalTime}</span>
            </div>
            <span className="text-text-secondary text-label">MIN</span>
          </div>

          {/* Accuracy
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-dark-button flex items-center justify-center mb-1 shadow-button">
              <span className="text-stats text-brand-primary">High</span>
            </div>
            <span className="text-text-secondary text-label">GPS</span>
          </div> */}

          {/* Points */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-dark-button flex items-center justify-center mb-1 shadow-button">
              <span className="text-stats">{totalPoints}</span>
            </div>
            <span className="text-text-secondary text-label">POINTS</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-between items-center px-4">
          {/* Reset Button */}
          <button className="w-16 h-16 rounded-full bg-dark-button flex items-center justify-center shadow-button hover:bg-opacity-80 transition-colors">
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
          <button className="w-16 h-16 rounded-full bg-dark-button flex items-center justify-center shadow-button hover:bg-opacity-80 transition-colors">
            <ArrowDownToLine className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GPSDrawingApp;
