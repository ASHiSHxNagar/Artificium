import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

const upload = multer({ storage });

export default upload;