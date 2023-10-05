const { response } = require("express");
const Usuario = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el correo existe
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    // Si el usuario está activo
    if (!user.status) {
      return res.status(400).json({
        msg: "Estado: false",
      });
    }

    // La contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password",
      });
    }

    // Crear JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
