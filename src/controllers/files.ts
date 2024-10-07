import { PutObjectCommandInput, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/config/aws";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";

type SuccessI = {
  success: true;
};
type ErrorI = {
  success: false;
  message: string;
};

type ResponseI = SuccessI | ErrorI;

const saveFile = async (file: any, type: string,extention: string, size: number): Promise<ResponseI> => {
  const params: PutObjectCommandInput = {
    Bucket: "liconapp-public-assets",
    Key: `signature1.${extention}`,
    ContentLength: size,
    Body: file,
    ContentType: type,
  };
  try {
    await s3Client.send(new PutObjectCommand(params));
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Cannot save the file" };
  }
};

const saveFileV2 = async (file: any): Promise<ResponseI> => {
  const stream = fs.createReadStream(file.path)
  const extention = file.originalname.split('.').pop()
  try {
    const uploadParams = {
        Bucket: "liconapp-public-assets",
        Key:  `avatar2.${extention}`,
        Body: stream,
        ContentType: file.mimetype,
    };
    await s3Client.send(new PutObjectCommand(uploadParams))
    return { success: true };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Error",
    };
  }
};

export const fileController = { saveFile,saveFileV2 };
