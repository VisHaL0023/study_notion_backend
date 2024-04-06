import { Schema, model } from "mongoose";

const profileSchema = new Schema(
    {
        gender: {
            type: String,
        },
        dateOfBirth: {
            type: String,
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true,
            minLength: 10,
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
