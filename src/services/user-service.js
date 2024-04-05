import { UserRepository } from "../repositories/index.js";
import bcrypt from "bcrypt";
import { ServerConfig, sendingMail } from "../config/index.js";
import jsonwebtoken from "jsonwebtoken";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async generateJWT(reqbody) {
    try {
      const user = await this.userRepository.findByEmail({
        email: reqbody.email,
      });
      if (!user) {
        return jsonwebtoken.sign(
          { id: reqbody.contactNumber, email: reqbody.email },
          ServerConfig.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
      }
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        ServerConfig.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(data) {
    try {
      let user = await this.userRepository.findByEmail({ email: data.email });
      if (!user) {
        const token = await this.generateJWT(data);
        user = await this.userRepository.create({ ...data, token: token });
        if (token) {
          sendingMail({
            from: ServerConfig.NODE_MAILER_EMAIL,
            to: `${user.email}`,
            subject: "Account verification for Study Notion",
            text: `Hello, ${user.name} Please verify your email by
            clicking this link :
            http://localhost:${ServerConfig.PORT}/api/v1/auth/verify-email/${user.id}?token=${user.token} `,
          });
          throw {
            success: true,
            message: "Verify your mail",
            data: {},
            error: {},
          };
        }
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

      if (user.isVerified) {
        return (response = {
          token: token,
          userData: {
            id: user.id,
            name: user.name,
            email: user.email,
            accountType: user.accountType,
            contactNumber: user.contactNumber,
            active: user.active,
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async verifyMail(reqbody) {
    try {
      const user = await this.userRepository.findByValue({ token: reqbody });
      if (user.isVerified) {
        throw {
          message: "User already Verified",
        };
      } else {
        const updatedUser = await this.userRepository.update(user.id, {
          isVerified: true,
        });
        return updatedUser;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default UserService;
