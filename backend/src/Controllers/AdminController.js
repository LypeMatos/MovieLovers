import dotenv from "dotenv";
dotenv.config();

import Admin from "../Models/AdminModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerAdmin = async (req, res) => {
    const {admin, password} = req.body;
    const checkAdmin = await Admin.findOne({admin})

    if(!admin || checkAdmin){
        res.status(422).json({message: "Insira um nome de administrador válido"});
    }

    if(!password || password.length < 6){
        res.status(422).json({message: "Insira uma senha válida"});
    }

    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = {admin, password: hashedPassword};

    try {
        await Admin.create(newAdmin);
        res.status(200).json({message: "Administrador criado com sucesso"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Não foi possível atender sua solicitação no momento"});
    }
}

export {registerAdmin};