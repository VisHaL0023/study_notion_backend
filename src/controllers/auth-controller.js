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
      const response = await userService.signUp({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contactNumber: req.body.contactNumber,
        accountType: req.body.accountType,
        active: req.body.active,
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
}

export default AuthController;
