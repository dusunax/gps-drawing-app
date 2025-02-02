import { Suspense } from "react";
import { notFound } from "next/navigation";
import DrawingDetail from "@/components/DrawingDetail";
import { getDrawingById } from "@/lib/database/get-drawing-by-id";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  if (!params.id) {
    return <div>Drawing not found</div>;
  }

  const drawing = await getDrawingById(params.id);
  const jsonData = JSON.stringify(drawing);

  if (!drawing) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawingDetail jsonData={jsonData} />
    </Suspense>
  );
}
