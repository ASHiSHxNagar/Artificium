import Data from '../models/data.model.js';
import cloudinary from '../config/cloudinary.js';
import createError from 'http-errors';

export const uploadData = async (req, res, next) => {
    try {
        if (!req.file) throw createError(400, 'No image uploaded');

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Save data to MongoDB
        const newData = new Data({
            text: req.body.text,
            imageUrl: result.secure_url,
        });

        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        next(error);
    }
};