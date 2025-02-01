import { Suspense } from "react";
import Link from "next/link";
import DrawingList from "@/components/DrawingList";
import DrawingStats from "@/components/DrawingStats";
import Header from "@/components/Header";
import { Map } from "lucide-react";
import { getAllDrawings } from "@/lib/database/get-all-drawings";

export const dynamic = "force-dynamic"; 

export default async function Page() {
  const drawings = await getAllDrawings();
  const jsonData = JSON.stringify(drawings);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header>
        <Link
          href="/"
          className="w-10 h-10 flex items-center justify-center hover:bg-opacity-80 transition-colors"
        >
          <Map className="w-5 h-5" />
        </Link>
      </Header>
      <DrawingStats drawingCount={drawings.length} />
      <DrawingList jsonData={jsonData} />
    </Suspense>
  );
}
