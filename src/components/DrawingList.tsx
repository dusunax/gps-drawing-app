"use client";
import Image from "next/image";
import { format } from "date-fns";
import type { Drawing } from "@/types/drawing";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DrawingList({ jsonData }: { jsonData: string }) {
  const drawingsArray = JSON.parse(jsonData) as Drawing[];
  const router = useRouter();

  const goToDrawing = (id: string) => {
    console.log(id);
    router.push(`/drawing/${id}`);
  };

  return (
    <div className="space-y-3 mx-6 pb-10">
      {drawingsArray.map((drawing) => (
        <Card
          key={drawing.id}
          onClick={() => goToDrawing(drawing.id)}
          className="hover:bg-accent transition-colors cursor-pointer bg-dark-surface border-none"
        >
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full pb-[100%] sm:pb-0 sm:w-24 sm:h-24 bg-text-disabled rounded-lg overflow-hidden relative">
                <Image
                  src={drawing.imageUrl}
                  alt={`Map preview for ${drawing.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex-1 flex justify-between gap-8">
                <div>
                  <h3 className="font-semibold text-lg text-brand-primary">
                    {drawing.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-2 ">
                    {format(new Date(drawing.createdAt.seconds * 1000), "Pp")}
                  </p>
                  <p className="text-sm text-text-muted mb-2 line-clamp-3">
                    {drawing.description}
                  </p>
                </div>

                {drawing.enrich !== undefined &&
                  drawing.enrich?.duration > 0 && (
                    <aside className="min-w-24 flex flex-col gap-y-1 sm:gap-4 shrink-0 justify-end">
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
      ))}
    </div>
  );
}

function EnrichInfo({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex gap-2 items-center sm:items-end">
      <p className="text-xs text-muted-foreground sm:mb-[2px]">{label}</p>
      <p className="text-sm font-semibold text-brand-primary">{value}</p>
    </div>
  );
}
