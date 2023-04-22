import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "Acesso negado"});
    }
    const token = authHeader.split(" ")[1];
    
    if(!token){
        return res.status(401).json({message: "Acesso negado"});
    }

    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                return res.status(403).json({message: "Acesso negado"});
            }
            req.user = decoded.username;
            next();
        });       
    }catch(error){
        console.log(error);
        res.status(401).json({message: "Token Inválido"});
    }
}

export {verifyToken};