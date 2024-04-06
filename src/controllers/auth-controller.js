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
            const response = await userService.signIn(req.body);

            successObj.message = "Sign in successfully";
            successObj.data = response.userData;
            successObj.token = response.token;

            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            errorObj.message = "Something went wrong while login a user";
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async verifyemail(req, res) {
        try {
            const q = req.query;
            const response = await userService.verifyMail(q.token);

            if (response) {
                successObj.message = "Verified successfully, Please login now";

                return res.status(StatusCodes.OK).json(successObj);
            }
        } catch (error) {
            errorObj.message = "Something went wrong while verifing a user";
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
