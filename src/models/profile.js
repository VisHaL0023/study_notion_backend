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
      unique: true,
    },
    about: {
      type: String,
      max: [250, "About cannot be of more than 250 characters"],
    },
  },
  { timestamps: true }
);

const Profile = model("profile", profileSchema);

export default Profile;
