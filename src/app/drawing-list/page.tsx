import { Suspense } from "react";
import { getAllDrawings } from "@/lib/database/get-all-drawings";
import DrawingList from "@/components/DrawingList";
import DrawingStats from "@/components/DrawingStats";
import Loading from "@/components/Loading";
import HeaderWithNav from "@/components/HeaderWithNav";

export const dynamic = "force-dynamic";

export default async function Page() {
  const drawings = await getAllDrawings();
  const jsonData = JSON.stringify(drawings);

  return (
    <Suspense fallback={<Loading />}>
      <HeaderWithNav />
      <DrawingStats drawingCount={drawings.length} />
      <DrawingList jsonData={jsonData} />
    </Suspense>
  );
}
