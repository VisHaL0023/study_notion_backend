import { Schema, model } from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";
// import { ServerConfig } from "../config/index.js";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            isEmail: true, //checks for email format
            trim: true,
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
            default: "Student",
            enum: ["Student", "Instructor", "Admin"],
        },
        active: {
            type: Boolean,
            required: true,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        token: {
            type: String,
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
