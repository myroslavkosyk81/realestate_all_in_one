import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log('token', token)
    // console.log(req)
    if(!token) return next(errorHandler(401, 'Unauthorized222'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbiden'))
        req.user = user;
        next();
    });
}