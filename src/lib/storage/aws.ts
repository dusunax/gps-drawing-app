import AWS from "aws-sdk";
import sharp from "sharp";
import { IMAGE_CONFIG } from "@/constant/image-config";

const {
  CONTENT_TYPE: contentType,
  EXTENSION: ext,
  QUALITY: quality,
} = IMAGE_CONFIG;

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

interface UploadToS3Props {
  imageFile: File;
  userId: string;
}

const uploadToS3 = async ({ imageFile, userId }: UploadToS3Props) => {
  try {
    const buffer = await imageFile.arrayBuffer();

    const optimizedImage = await sharp(Buffer.from(buffer))
      .resize({ width: 1080 })
      .toFormat(ext, { quality })
      .toBuffer();

    const fileName = `${userId}/${Date.now()}.${IMAGE_CONFIG.EXTENSION}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileName,
      Body: optimizedImage,
      ContentType: contentType,
    };

    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error("🚨 Failed to upload image to S3:", error);
    throw new Error("Failed to upload image to S3");
  }
};

export { uploadToS3 };
