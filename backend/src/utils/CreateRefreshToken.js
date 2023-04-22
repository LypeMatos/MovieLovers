import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const createRefreshToken = async (user, req, res) => {

    try {
        const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        });
    
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
    
        return refreshToken;
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Não foi possível atender a sua solicitação no momento"});
    }    
}

export default createRefreshToken;