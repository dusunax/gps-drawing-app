import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center h-screen flex-col gap-2 items-center opacity-0 animate-fade-in">
      <div className="translate-y-2 animate-flip-y">
        <Image
          src="/icons/icon-512x512.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-12 h-12"
        />
      </div>
      <div className="relative w-10 h-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-brand-primary w-12 h-12 animate-ping" />
        <div className="opacity-70">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-brand-primary w-6 h-6 animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-brand-primary w-1 h-1 animate-pulse" />
      </div>
    </div>
  );
}
