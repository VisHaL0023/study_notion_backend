import { Schema, model } from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";
// import { ServerConfig } from "../config/index.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    courseProgress: {
      type: Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  const salt = genSaltSync(9);
  const encryptedPassword = hashSync(user.password, salt);
  user.password = encryptedPassword;
  next();
});

const User = model("User", userSchema);

export default User;
