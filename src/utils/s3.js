import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export async function uploadToS3(localPath, s3Key) {
  const fileStream = fs.createReadStream(localPath);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: s3Key,
    Body: fileStream,
    ACL: 'public-read'
  });
  await s3.send(command);
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
}
