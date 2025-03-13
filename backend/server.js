import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
// import aws from 'aws-sdk';

//routes
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import artificiumRoutes from "./routes/artificiumRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//routes handlers
app.use("/users", userRoutes);
app.use("/workspaces", workspaceRoutes);
app.use("/artificium", artificiumRoutes);


// Set COOP header
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    autoIndex: true,
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});