import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import aws from 'aws-sdk';
import { nanoid } from 'nanoid';

//routes
import userRoutes from "./routes/userRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import artificiumRoutes from "./routes/artificiumRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;

// Allow your frontend domain
app.use(cors({
    origin: "https://artificium-clone.netlify.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.use(express.json());

//routes handlers
app.use("/users", userRoutes);
app.use("/workspaces", workspaceRoutes);
app.use("/artificium", artificiumRoutes);
app.use("/artificiumconversation", chatRoutes);
app.use("/messages", messageRoutes);


app.get('/', (req, res) => {
    res.send('Server is alive !');
  });

// upload image url route
app.get('/get-upload-url', async (req, res) => {
    generateUploadURL().then((url) => {
        return res.status(200).json({ uploadURL: url });
    }).catch(err => {
        return res.status(500).json({ "error": err.message });
    });
});
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

/// setting up s3 bucket
const s3 = new aws.S3({
    region: 'eu-north-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const generateUploadURL = async () => {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

    return await s3.getSignedUrlPromise('putObject', {
        Bucket: 'mernblogwebsiteyt-mordernwebdev',
        Key: imageName,
        Expires: 3000,
        ContentType: 'image/jpeg'
    });
};
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});