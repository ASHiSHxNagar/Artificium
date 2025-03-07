import mongoose from "mongoose";

const profile_imgs_name_list = [
    "Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia",
    "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna",
    "Jack", "Felix", "Kiki"
];

const profile_imgs_collections_list = [
    "notionists-neutral",
    "adventurer-neutral",
    "fun-emoji"
];

const userSchema = new mongoose.Schema(
    {
        personal_info: {
            fullname: {
                type: String,
                lowercase: true,
                minlength: [3, "Full name must be at least 3 letters long"],
            },
            email: {
                type: String,
                required: true,
                lowercase: true,
                unique: true, // Ensure email is unique
            },
            password: {
                type: String,
            },
            username: {
                type: String,
                minlength: [3, "Username must be at least 3 letters long"],
                unique: true, // Ensure username is unique
                required: true,
            },
            profile_img: {
                type: String,
                default: () => {
                    // random DiceBear avatar
                    const randomCollection = profile_imgs_collections_list[
                        Math.floor(Math.random() * profile_imgs_collections_list.length)
                    ];
                    const randomSeed = profile_imgs_name_list[
                        Math.floor(Math.random() * profile_imgs_name_list.length)
                    ];
                    return `https://api.dicebear.com/6.x/${randomCollection}/svg?seed=${randomSeed}`;
                },
            },
        },
        google_auth: {
            type: Boolean,
            default: false,
        },
        // If you want to store Google OAuth tokens, you can add them here:
        // googleId: { type: String, unique: true },
        // accessToken: String,
        // refreshToken: String,

        // If you want user status (online/offline/away), you can add:
        status: {
            type: String,
            enum: ["online", "offline"],
            default: "offline",
        },
    },
    {
        timestamps: {
            createdAt: "joinedAt", // will store as "joinedAt"
            updatedAt: true,       // will store as "updatedAt"
        },
    }
);

export default mongoose.model("User", userSchema);
