import { useState } from "react";
import html2canvas from "html2canvas";
import type { DrawingEnrich } from "@/types/drawing";
import { toast } from "./use-toast";
import { IMAGE_CONFIG } from "@/constant/image-config";

const { CONTENT_TYPE: contentType, EXTENSION: ext } = IMAGE_CONFIG;

interface UseImageSaverProps {
  imageContainerRef: React.RefObject<HTMLDivElement | null>;
  enrich: DrawingEnrich;
  title: string;
  description: string;
}

const useImageSaver = ({
  imageContainerRef,
  enrich,
  title,
  description,
}: UseImageSaverProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const updateDrawingCanvas = async () => {
    if (!imageContainerRef.current) return null;
    const canvas = await html2canvas(imageContainerRef.current, {
      useCORS: true,
      scale: 2,
    });
    return canvas;
  };

  const saveImageLocally = (imgUrl: string, title: string) => {
    try {
      const date = new Date().toISOString().split("T")[0];
      const link = document.createElement("a");
      link.href = imgUrl;
      link.download = `${date}-${title}.${ext}`;
      link.click();
    } catch (error) {
      console.error("🚨 Failed to save image locally", error);
    }
  };

  const sendImageToServer = (canvas: HTMLCanvasElement) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return reject("Blob 생성 실패");

        try {
          const date = new Date().toISOString().split("T")[0];
          const fileName = `${date}-map-drawing.${ext}`;

          const formData = new FormData();
          formData.append("image", blob, fileName);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("distance", enrich.distance.toString());
          formData.append("duration", enrich.duration.toString());
          formData.append("points", enrich.points.toString());

          const response = await fetch("/api/save-image", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();
          if (!response.ok) return reject("Failed to save image");
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, contentType);
    });
  };

  const handleSaveImage = async () => {
    setIsSaving(true);
    let result;

    try {
      const canvas = await updateDrawingCanvas();
      if (!canvas) throw new Error("Failed to update drawing canvas");

      const image = canvas.toDataURL(contentType);
      saveImageLocally(image, title);

      const data = await sendImageToServer(canvas);

      toast({
        title,
        description: "이미지가 저장 되었습니다",
        duration: 2000,
      });
      result = { ok: true, data };
    } catch (error) {
      toast({
        title: "저장 실패",
        description: "이미지 저장에 실패했습니다",
        duration: 2000,
        variant: "destructive",
      });
      result = { ok: false, error };
    } finally {
      setIsSaving(false);
    }

    return result;
  };

  return {
    isSaving,
    handleSaveImage,
    saveImageLocally,
  };
};

export default useImageSaver;
