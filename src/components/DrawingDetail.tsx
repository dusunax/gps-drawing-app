import { Drawing } from "@/types/drawing";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import Image from "next/image";
import GoBackButton from "./GoBackButton";
import DownloadButton from "./DownloadButton";
import KakaoShareButton from "./KakaoShareButton";

export default function DrawingDetail({ jsonData }: { jsonData: string }) {
  const drawing = JSON.parse(jsonData) as Drawing;

  return (
    <Card
      key={drawing.id}
      className="h-screen hover:bg-accent transition-colors cursor-pointer bg-dark-surface border-none"
    >
      <CardContent className="px-6 pt-2 h-full flex flex-col justify-between">
        <header className="flex justify-between items-center mb-2 gap-2">
          <div className="flex items-center">
            <GoBackButton className="-ml-3 -mr-1" />
            <h2 className="font-semibold text-lg text-brand-primary">
              {drawing.title}
            </h2>
          </div>
        </header>

        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full pb-[100%] bg-text-disabled rounded-lg overflow-hidden relative">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <div className="bg-dark-button shadow-button text-brand-primary border border-brand-primary rounded-full cursor-pointer">
                <DownloadButton
                  imageUrl={drawing.imageUrl}
                  title={drawing.title}
                />
              </div>
              <KakaoShareButton
                title={drawing.title}
                imageUrl={drawing.imageUrl}
              />
            </div>
            <Image
              src={drawing.imageUrl}
              alt={`Map preview for ${drawing.title}`}
              fill
              className="object-cover -mx-[1px]"
              sizes="100vw"
            />
          </div>
          <p className="text-xs text-text-muted shrink-0 text-right">
            {format(new Date(drawing.createdAt.seconds * 1000), "Pp")}
          </p>
          <div className="flex-1 flex flex-col justify-between gap-1 text-center">
            <div className="mt-6 mb-8">
              <p className="text-lg text-text-muted mb-2 line-clamp-3">
                {drawing.description}
              </p>
            </div>

            {drawing.enrich !== undefined && drawing.enrich?.duration > 0 && (
              <aside className="flex gap-2 justify-center flex-wrap">
                <EnrichInfo
                  label="Distance"
                  value={drawing.enrich?.distance || 0}
                />
                <EnrichInfo
                  label="Duration"
                  value={drawing.enrich?.duration || 0}
                />
                <EnrichInfo
                  label="Points"
                  value={drawing.enrich?.points || 0}
                />
              </aside>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EnrichInfo({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex gap-1 items-center">
      <p className="text-sm text-text-muted">{label}</p>
      <p className="text-sm font-semibold text-brand-primary">{value}</p>
    </div>
  );
}
