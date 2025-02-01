import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
    text: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Data', dataSchema);