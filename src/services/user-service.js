import { UserRepository } from "../repositories/index.js";
// import bcrypt from "bcrypt";
// import { ServerConfig } from "../config/index.js";
// import jsonwebtoken from "jsonwebtoken";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(data) {
    try {
      let user = await this.userRepository.findByEmail({ email: data.email });
      if (!user) {
        user = await this.userRepository.create(data);
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
      throw error;
    }
  }
}

export default UserService;
