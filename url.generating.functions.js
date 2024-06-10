import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const REGION = process.env.IMAGE_UPLOAD_AWS_REGION;
const BUCKET_NAME = process.env.IMAGE_UPLOAD_AWS_BUCKET_NAME;

const credentials = {
  accessKeyId: process.env.IMAGE_UPLOAD_AWS_ACCESS_KEY,
  secretAccessKey: process.env.IMAGE_UPLOAD_AWS_SECRET_KEY,
};

const s3Client = new S3Client({ region: REGION, credentials });

//Put object url and file name
export const generatePresignedUrlForFileUpload = async (fileName) => {
  try {
    const newFileName = Date.now().toString() + fileName;
    const params = {
      Bucket: BUCKET_NAME,
      Key: `uploads/${newFileName}`,
      ContentType: "image/*",
    };

    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });
    // console.log(newFileName);
    // console.log(url)
    return { url, newFileName };
  } catch (err) {
    console.log("Error", err);
  }
};
