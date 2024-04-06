import {
    UserRepository,
    OTPRepository,
    ProfileRepository,
} from "../repositories/index.js";
import { ServerConfig } from "../config/index.js";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import otpGenerator from "otp-generator";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.otpRepository = new OTPRepository();
        this.profileRepository = new ProfileRepository();
    }

    async generateJWT(reqbody) {
        try {
            const user = await this.userRepository.findByEmail({
                email: reqbody.email,
            });
            return jsonwebtoken.sign(
                { id: user.id, email: user.email },
                ServerConfig.JWT_SECRET_KEY,
                { expiresIn: "7d" }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async signUp(reqbody) {
        try {
            console.log("reqbody", reqbody);
            let user = await this.userRepository.findByEmail({
                email: reqbody.email,
            });
            if (!user) {
                const response = await this.otpRepository.findOTP({
                    email: reqbody.email,
                });

                console.log("response otp", response);

                if (response.length === 0 || reqbody.otp !== response[0].otp) {
                    // OTP not found for the email or not equal to otp
                    throw {
                        success: false,
                        message: "The OTP is not valid",
                    };
                }

                let approved = "";
                approved =
                    reqbody.accountType === "Instructor"
                        ? (approved = false)
                        : (approved = true);

                const profileDetails = await this.profileRepository.create({
                    gender: null,
                    dateOfBirth: null,
                    contactNumber: reqbody.contactNumber,
                    about: null,
                });

                const user = await this.userRepository.create({
                    firstName: reqbody.firstName,
                    lastName: reqbody.lastName,
                    email: reqbody.email,
                    password: reqbody.password,
                    accountType: reqbody.accountType,
                    approved: approved,
                    profile: profileDetails._id,
                    image: "sample",
                });
                return user;
            }
            throw {
                success: false,
                message: "User already exists for given email",
                data: {},
                error: {},
            };
        } catch (error) {
            console.log("Something went wrong in user service");
            console.log(error);
            throw error;
        }
    }

    async signIn(reqbody) {
        try {
            const user = await this.userRepository.findByEmail({
                email: reqbody.email,
            });

            if (!user) {
                throw {
                    success: false,
                    message: "No user found",
                };
            }

            const isPasswordMatch = bcrypt.compareSync(
                reqbody.password,
                user.password
            );
            if (isPasswordMatch) {
                return res.status(401).json({
                    success: false,
                    message: `Password is incorrect`,
                });
            }
            const token = await this.generateJWT(reqbody);

            user.password = undefined;
            const response = { ...user, token: token };
            // Set cookie for token and return success response
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async sendOtp(email) {
        try {
            const user = await this.userRepository.findByEmail({ email });

            if (user) {
                throw {
                    success: false,
                    message: "User already exists for given email",
                };
            }

            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: true,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            const response = await this.otpRepository.create({ email, otp });
            return response;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default UserService;
