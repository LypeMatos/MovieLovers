import dotenv from "dotenv";
dotenv.config();

import User from "../Models/UserModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailVerification } from "../Helper/Mail.js";

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    const checkUser = await User.findOne({username: username});
    const checkEmail = await User.findOne({email: email});

    if(!username || checkUser){
        return res.status(422).json({message: "Insira um nome de usuário válido"});
    }

    if(!email || checkEmail){
        return res.status(422).json({message: "Insira um e-mail válido"});
    }

    if(!password || password.length < 6){
        return res.status(422).json({message: "Insira uma senha válida"});
    }

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        username, email, password: hashedPassword
    }

    const secret = process.env.JWT_SECRET;
    //const verifyEmail = await bcrypt.hash("userverifyemail", salt);
    //const link = `http://localhost:8080/verifyemail/${verifyEmail}`;

    try {
        await User.create(newUser);
        const token = jwt.sign({username}, secret);
        await emailVerification(email);
        res.status(200).json({message: "Usuário criado com sucesso", token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Não foi possível atender sua solicitação no momento. Tente novamente mais tarde"});
    }
}

export { registerUser };