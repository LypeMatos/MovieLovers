import dotenv from "dotenv";
dotenv.config();

import User from "../Models/UserModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailVerification } from "../utils/Mail.js";

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;
    const checkUser = await User.findOne({username});
    const chekEmail = await User.findOne({email});

    if(!username || checkUser){
        return res.status(422).json({message: "Insira um nome de usuário válido"});
    }

    if(!email || chekEmail){
        return res.status(422).json({message: "Insira um e-mail válido"});
    }

    if(!password || password.length < 6){
        return res.status(422).json({message: "Insira uma senha válida"});
    }

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {username, email, password: hashedPassword};

    const secret = process.env.JWT_SECRET;

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