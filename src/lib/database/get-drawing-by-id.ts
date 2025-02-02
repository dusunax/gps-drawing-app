import { db } from "@/lib/database/firebase";
import { Drawing } from "@/types/drawing";
import { doc, getDoc } from "firebase/firestore";

export async function getDrawingById(id: string): Promise<Drawing | null> {
  try {
    const drawingRef = doc(db, "drawings", id); // 특정 문서 참조
    const drawingSnapshot = await getDoc(drawingRef); // 문서 스냅샷 가져오기

    if (!drawingSnapshot.exists()) {
      return null; 
    }

    return {
      id: drawingSnapshot.id,
      ...drawingSnapshot.data(),
    } as Drawing;
  } catch (error) {
    console.error("[getDrawingById]", error);
    throw new Error("Failed to fetch drawing by id");
  }
}
