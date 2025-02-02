"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={cn("w-10 h-10 flex items-center justify-center cursor-pointer", className)}  
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
}
