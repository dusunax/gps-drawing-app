"use client";
import { useState } from "react";
import GPSDrawingApp from "@/components/GPSDrawingApp";
import DrawingSettingDrawer from "@/components/DrawingSettingsDrawer";
import { randomDescription } from "@/utils/get-random-description";
import HeaderWithNav from "@/components/HeaderWithNav";

export default function Home() {
  const [title, setTitle] = useState("My GPS Drawing");
  const [description, setDescription] = useState(randomDescription());

  const drawingInputs = {
    title,
    description,
  };

  return (
    <>
      <HeaderWithNav>
        <DrawingSettingDrawer
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          initialTitle={title}
          initialDescription={description}
        />
      </HeaderWithNav>
      <GPSDrawingApp drawingInputs={drawingInputs} />
    </>
  );
}

