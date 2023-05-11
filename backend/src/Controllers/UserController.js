//dotenv
import dotenv from "dotenv";
dotenv.config();

//model
import User from "../Models/UserModel.js";

//imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//utils
import { emailVerification } from "../utils/Mail.js";
import { createToken } from "../utils/createToken.js";
import createRefreshToken from "../utils/CreateRefreshToken.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({
        message:
          "Insira o seu e-mail e a senha cadastrada para efetuar o login",
      });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Não existe um usuário com este e-mail" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  try {
    await createRefreshToken(user, req, res);
    const accessToken = await createToken(user);
    res
      .status(200)
      .json({ message: "Login efetuado com sucesso.", accessToken });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Não foi possível atender sua solicitação no momento" });
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  console.log(cookies);

  const refreshToken = cookies.jwt;
  const decodedRefreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const foundUser = await User.findOne({
    username: decodedRefreshToken.username,
  });

  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const checkUser = await User.findOne({ username });
  const chekEmail = await User.findOne({ email });

  if (!username || checkUser) {
    return res
      .status(422)
      .json({ message: "Insira um nome de usuário válido" });
  }

  if (!email || chekEmail) {
    return res.status(422).json({ message: "Insira um e-mail válido" });
  }

  if (!password || password.length < 6) {
    return res.status(422).json({ message: "Insira uma senha válida" });
  }

  const salt = await bcrypt.genSalt(16);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = { username, email, password: hashedPassword };

  try {
    await User.create(newUser);
    const user = await User.findOne({ username: newUser.username });
    const link = `http://localhost:8080/verifyemail/${user._id}`;
    await emailVerification(email, link);
    res.status(200).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message:
          "Não foi possível atender sua solicitação no momento. Tente novamente mais tarde",
      });
  }
};

const verifyUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    res.status(422).json({ message: "Não foi possível localizar um usuário" });
  }

  try {
    await User.findByIdAndUpdate(userId, { verified: true });
    res.status(200).json({ message: "E-mail verificado com sucesso" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message:
          "Não foi possível atender sua solicitação no momento. Tente novamente mais tarde",
      });
  }
};

const userProfile = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    if(!user){
      return res.status(422).json({message: "Usuário não encontrado"});
    }

    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: "Não foi possível atender a solicitação no momento"});
  }
};

export { loginUser, handleRefreshToken, registerUser, verifyUser, userProfile };
