import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join('public', 'userProfile');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueId = Date.now();
    const fileFormat = file.originalname.split('.').pop();
    const fileName = file.originalname.split('.')[0];
    cb(null, `${fileName}-${uniqueId}.${fileFormat}`);
  }
});

const upload = multer({ storage: storage });

export const singleUpload = upload.single('picture');