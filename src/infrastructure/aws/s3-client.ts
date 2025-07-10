import { S3 } from 'aws-sdk';

export const s3Client = new S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});