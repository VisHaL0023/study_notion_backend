import { UserService } from "../services/index.js";
import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

let userService;
class AuthController {
    constructor() {
        userService = new UserService();
    }

    async createUser(req, res) {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                contactNumber,
                accountType,
                otp,
            } = req.body;

            if (
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !contactNumber ||
                !accountType ||
                !otp
            ) {
                errorObj.message = "All fields are required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const response = await userService.signUp({
                firstName,
                lastName,
                email,
                password,
                contactNumber,
                accountType,
                otp,
            });

            successObj.message = "Successfully created a new user";
            successObj.data = response;

            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            errorObj.message = "Something went wrong while creating a user";
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async logIn(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                errorObj.message = "All fields are required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            const response = await userService.signIn(req.body);

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", response.token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        } catch (error) {
            errorObj.message = "Something went wrong while login a user";
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async sendOtp(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                errorObj.message = "Email is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }
            const response = await userService.sendOtp(email);

            successObj.message = "OTP Created successfully";
            successObj.data = response;
            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            errorObj.message = "Something went wrong while sending otp";
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }
}

export default AuthController;
