import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const secret = process.env.ACCESS_TOKEN_SECRET;

const createToken = async (user) => {
    const accessToken = jwt.sign({username: user.username}, secret, {
        expiresIn: "30s"
    });    

    return accessToken;
}

export {createToken};