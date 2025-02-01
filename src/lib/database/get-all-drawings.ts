import { db } from "@/lib/database/firebase";
import { Drawing } from "@/types/drawing";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getAllDrawings(): Promise<Drawing[]> {
  try {
    const drawingsRef = collection(db, "drawings");
    const q = query(drawingsRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const drawings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Drawing[];

    return drawings;
  } catch (error) {
    console.error("[getAllDrawings]", error);
    throw new Error("Failed to fetch drawings");
  }
}
