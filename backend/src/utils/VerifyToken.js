import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(403).json({message: "Acesso negado"});

    const token = authHeader?.split(" ")[1];

    if(!token) return res.status(403).json({message: "Acesso negado"});

    try{
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.id;
        next();
    }catch (error){
        console.log(error);
        res.sendStatus(500);
    }
    
}

export default verifyToken;