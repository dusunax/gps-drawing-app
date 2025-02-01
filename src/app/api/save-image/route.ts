import { NextResponse } from "next/server";
import { db } from "@/lib/database/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToS3 } from "@/lib/storage/aws";

const userId = "test-user-id";

export async function POST(req: Request) {
  const formData = await req.formData();
  const imageFile = formData.get("image") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const distance = formData.get("distance") as string;
  const duration = formData.get("duration") as string;
  const points = formData.get("points") as string;

  const imageUrl = await uploadToS3({ imageFile, userId });

  const drawingData = {
    userId,
    title,
    description,
    imageUrl,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    enrich: {
      distance: Number(distance),
      duration: Number(duration),
      points: Number(points),
    },
  };

  const drawingRef = collection(db, "drawings");
  const docRef = await addDoc(drawingRef, drawingData);

  return NextResponse.json({ success: true, imageUrl, id: docRef.id });
}
