import { FormatEnum } from "sharp";

export const CONTENT_TYPE = "image/webp";
export const IMAGE_CONFIG = {
  CONTENT_TYPE,
  EXTENSION: CONTENT_TYPE.split("/")[1] as keyof FormatEnum,
  QUALITY: 80,
};
