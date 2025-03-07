import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccountKey from './artificium-fd812-firebase-adminsdk-fbsvc-1297311006.json' assert { type: "json" };
import { getAuth } from 'firebase-admin/auth';
// import aws from 'aws-sdk';

import User from './Schema/User.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

const formatDataToSend = (user) => {
    const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    };
};


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

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


//generating username 
const generateUsername = async (email) => {
    let username = email.split("@")[0];

    let usernameExists = await User.exists({ "personal_info.username": username }).then((result) => result);
    if (usernameExists) {
        username += nanoid().substring(0, 5);
    }

    return username;
};



// Register route
app.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    // console.log('Received data:', req.body); // Log received data

    // validating data from frontend
    if (fullname.length < 3) {
        return res.status(403).json({ "error": "Full name must be at least 3 letters long" });
    }
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Invalid Email Format" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({ "error": "Password should be 6 to 20 characters long with numeric, 1 lowercase and 1 uppercase letters" });
    }

    let username = await generateUsername(email);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            personal_info: {
                fullname,
                email,
                username,
                password: hashedPassword,
            },
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error saving user:', error); // Log the error
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({ error: 'Email or username already exists' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ 'personal_info.email': email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.personal_info.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.post('/google-auth', async (req, res) => {
    let { access_token } = req.body;

    getAuth()
        .verifyIdToken(access_token)
        .then(async (decodedUser) => {
            let { email, name, picture } = decodedUser;

            picture = picture.replace("s96-c", "s384-c");

            let user = await User.findOne({ "personal_info.email": email }).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth ")
                .then((u) => {
                    return u || null;
                }).catch(err => {
                    return res.status(500).json({ "error": err.message });
                });

            if (user) {
                // login
                if (!user.google_auth) {
                    return res.status(403).json({ "error": "This email was signed up without Google. Please log in with password to access your account" });
                }
            } else {
                // signup
                let username = await generateUsername(email);

                user = new User({
                    personal_info: { fullname: name, email, username, profile_img: picture },
                    google_auth: true
                });

                await user.save().then((u) => {
                    user = u;
                }).catch(err => {
                    return res.status(500).json({ "error": err.message });
                });
            }
            return res.status(200).json(formatDataToSend(user));
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ "error": "Failed to authenticate you with Google. Try with some other Google account" });
        });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});