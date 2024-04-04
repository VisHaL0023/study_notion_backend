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
}

export default AuthController;
