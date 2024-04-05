import { UserRepository } from "../repositories/index.js";
import bcrypt from "bcrypt";
import { ServerConfig } from "../config/index.js";
import jsonwebtoken from "jsonwebtoken";

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

  async comparePassword(reqbody) {
    try {
      const user = await this.userRepository.findByEmail({
        email: reqbody.email,
      });
      return bcrypt.compareSync(reqbody.password, user.password);
    } catch (error) {
      console.log(error);
      throw error;
    }
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

  async signIn(reqbody) {
    try {
      const user = await this.userRepository.findByEmail({
        email: reqbody.email,
      });

      if (!user) {
        throw {
          success: false,
          message: "No user found",
          data: {},
          error: {},
        };
      }

      if (!(await this.comparePassword(reqbody))) {
        throw {
          success: false,
          message: "Incorrect password",
          data: {},
          error: {},
        };
      }
      const token = await this.generateJWT(reqbody);

      const response = {
        token: token,
        userData: {
          id: user.id,
          name: user.name,
          email: user.email,
          accountType: user.accountType,
          contactNumber: user.contactNumber,
          active: user.active,
        },
      };

      return response;
    } catch (error) {}
  }
}

export default UserService;
