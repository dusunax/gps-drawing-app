import { useState } from "react";
import html2canvas from "html2canvas";

interface UseImageSaverProps {
  imageContainerRef: React.RefObject<HTMLDivElement | null>;
}

const useImageSaver = ({ imageContainerRef }: UseImageSaverProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveImageLocally = async () => {
    if (!imageContainerRef.current) return;

    setIsSaving(true);
    try {
      const canvas = await html2canvas(imageContainerRef.current, {
        useCORS: true,
        logging: true,
        scale: 2,
      });

      const date = new Date().toISOString().split("T")[0];
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${date}-map-drawing.png`;
      link.click();

      return image;
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const sendImageToServer = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/save-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageContainerRef.current }),
      });
      if (!response.ok) throw new Error("Failed to save image");
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    saveImageLocally,
    sendImageToServer,
  };
};

export default useImageSaver;
