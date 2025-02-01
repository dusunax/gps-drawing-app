"use client";
import GPSDrawingApp from "@/components/GPSDrawingApp";
import { Logs } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition-colors">
          <Logs className="w-5 h-5" />
        </button>
      </Header>
      <GPSDrawingApp />
    </>
  );
}

