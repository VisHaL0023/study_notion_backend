import jwt from "jsonwebtoken";
import { ServerConfig } from "../config/index.js";

//auth
export async function authenticate(req, res, next) {
    try {
        //extract token
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorisation").replace("Bearer ", "");

        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, ServerConfig.JWT_SECRET_KEY);
            console.log("decode= ", decode);
            req.user = decode;
        } catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}
