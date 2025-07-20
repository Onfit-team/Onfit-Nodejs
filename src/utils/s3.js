import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// filePath: 로컬 경로, key: S3에 저장할 이름(경로포함)
export const uploadToS3 = async (filePath, key) => {
  const fileStream = fs.createReadStream(filePath);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key, // 예: 'cropped/xxx.jpg'
    Body: fileStream,
    ContentType: 'image/jpeg', // 확장자에 따라 다르게
    ACL: 'public-read' // S3 URL로 접근 가능하게
  };

  await s3.send(new PutObjectCommand(uploadParams));

  // S3에서 접근 가능한 URL 리턴
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
