const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");

const userSchema = new mongoose.Schema(
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
    email: {
      type: Boolean,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    courseProgress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  const salt = bcrypt.genSaltSync(ServerConfig.SALT_VALUE);
  const encryptedPassword = bcrypt.hashSync(user.password, salt);
  user.password = encryptedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
