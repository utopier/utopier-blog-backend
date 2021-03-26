import path from 'path';
import fs from 'fs';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

try {
    fs.accessSync('uploads');
  } catch (error) {
    console.log('uploads 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
  }
  
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
  
  export const upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'utopier-blog-dev-storage',
      key(req, file, cb) {
        console.log(req);
        console.log('multer : ',file);
        cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  });
  
  export const s3 = new AWS.S3();
  