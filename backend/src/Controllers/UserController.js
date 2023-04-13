import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const salt = 16;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        username, email, password: hashedPassword
    }

    try {
        await User.create(newUser);
        res.status(200).json({message: "Usuário criado com sucesso"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Não foi possível atender sua solicitação no momento. Tente novamente mais tarde"});
    }
}

export { registerUser };