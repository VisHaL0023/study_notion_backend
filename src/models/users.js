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
      match: /\S+@\S+\.\S+/,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
    },
    password: {
      type: String,
      minLength: 5,
      required: true,
      match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
    },
    accountType: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "instructor", "admin"],
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
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
  const hashedPassword = bcrypt.hashSync(this.password, 9);
  this.password = hashedPassword;
  next();
});

const User = model("User", userSchema);

export default User;
