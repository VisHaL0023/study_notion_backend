import { Schema, model } from "mongoose";

const profileSchema = new Schema(
    {
        gender: {
            type: String,
        },
        dob: {
            type: String,
        },
        contactNumber: {
            type: String,
            required: true,
            trim: true,
        },
        about: {
            type: String,
            max: [250, "About cannot be of more than 250 characters"],
        },
    },
    { timestamps: true }
);

const Profile = model("Profile", profileSchema);

export default Profile;
