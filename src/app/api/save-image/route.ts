import { NextResponse } from "next/server";
// import { uploadToS3 } from "@/lib/storage/aws";
import { db } from "@/lib/database/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const userId = "test-user-id";

const DUMMY_IMAGE_URL = "https://picsum.photos/300/300";

export async function POST(req: Request) {
  const formData = await req.formData();
  // const imageFile = formData.get("image") as File;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  // const imageUrl = await uploadToS3({ imageFile, userId });
  const imageUrl = DUMMY_IMAGE_URL;

  const drawingData = {
    userId,
    title,
    description,
    imageUrl,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const drawingRef = collection(db, "drawings");
  const docRef = await addDoc(drawingRef, drawingData);

  return NextResponse.json({ success: true, imageUrl, id: docRef.id });
}
