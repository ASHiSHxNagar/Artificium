import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dataRoutes from './routes/data.routes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/data', dataRoutes);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));