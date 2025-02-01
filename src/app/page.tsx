"use client";
import { useState } from "react";
import GPSDrawingApp from "@/components/GPSDrawingApp";
import Header from "@/components/Header";
import DrawingSettingDrawer from "@/components/DrawingSettingsDrawer";
import { randomDescription } from "@/utils/get-random-description";

export default function Home() {
  const [title, setTitle] = useState("My GPS Drawing");
  const [description, setDescription] = useState(randomDescription());

  const drawingInputs = {
    title,
    description,
  };

  return (
    <>
      <Header>
        <DrawingSettingDrawer
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          initialTitle={title}
          initialDescription={description}
        />
      </Header>
      <GPSDrawingApp drawingInputs={drawingInputs} />
    </>
  );
}

