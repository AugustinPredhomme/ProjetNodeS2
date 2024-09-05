import { Router } from 'express';
import { uploadFile, uploadMultipleFiles } from '../controllers/fileController';
import upload from '../middlewares/uploadMiddleware';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

router.post('/upload-multiple', upload.array('files', 5), uploadMultipleFiles);

export default router;