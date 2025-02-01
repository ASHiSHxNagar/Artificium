import express from 'express';
import { uploadData } from '../controllers/data.controller.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadData);

export default router;