"use client";
import { Save } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/shadcn/utils";

export default function DownloadButton({
  imageUrl,
  title,
  className,
}: {
  imageUrl: string;
  title: string;
  className?: string;
}) {
  const downloadDrawing = () => {
    const linkSource = imageUrl;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = `${title}.png`;
    downloadLink.target = "_blank";
    downloadLink.click();
  };

  return (
    <Button
      variant="ghost"
      className={cn("w-10 h-10 flex items-center justify-center", className)}
      onClick={downloadDrawing}
    >
      <Save className="w-6 h-6" />
    </Button>
  );
}
