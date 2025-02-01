import { Card, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";

export default function DrawingStats({
  drawingCount,
}: {
  drawingCount: number;
}) {
  const stats = [
    {
      icon: <Map className="w-6 h-6 text-green-500" />,
      value: drawingCount,
      label: "Total Drawings",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 mx-8 my-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-dark-surface border-none">
          <CardContent className="py-4 sm:pt-6 flex items-center gap-2 sm:flex-col">
            {stat.icon}
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="flex-1 text-xs text-muted-foreground break-keep order-[-1] sm:order-3 sm:-mt-1">
              {stat.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
