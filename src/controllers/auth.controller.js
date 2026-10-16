// * ARCHIVO A COMPLETAR
import { UserModel, ProfileModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

// TODO: 1. Hashear la password antes de guardarla (hashPassword).
    // TODO: 2. Crear el user y su profile asociado.
    // TODO: 3. Responder con código 201, un mensaje de éxito y devolver el usuario sin la password.


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    const existingUsername = await UserModel.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: "El username ya está registrado" });
    }

    
    const existingEmail = await UserModel.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    
    const hashedPassword = await hashPassword(password);

    
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    
    await ProfileModel.create({ user_id: user.id });

    
    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email 
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: 1. Buscar el user por email y comparar la password (comparePassword).
    // TODO: 2. Firmar un JWT con el id y el role del user (signToken).
    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token", responder con código 200 y un mensaje de éxito.
    // ? Considerar qué mensaje devolver ante credenciales inválidas.
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "credenciales invales" });
    }

    const token = signToken({ id: user.id, role: user.role });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "login exitoso",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(204).send();
    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningun mensaje.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
