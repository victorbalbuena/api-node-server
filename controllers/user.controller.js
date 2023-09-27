const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  // const usuarios = await Usuario.find({ status: true })
  //   .skip(Number(from))
  //   .limit(Number(limit));
  // const total = await Usuario.countDocuments({ status: true });

  const [total, users] = await Promise.all([
    Usuario.countDocuments({ status: true }),
    Usuario.find({ status: true }).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};

const addUsers = async (req, res = response) => {
  const { nombre, email, password, rol } = req.body;
  const usuario = new Usuario({ nombre, email, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Save in database
  await usuario.save();

  res.json({
    usuario,
  });
};

const editUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  // TODO validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  // Borrar fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { status: false });
  res.json({
    id,
    usuario,
  });
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: "patch API - controller",
  });
};

module.exports = {
  getUsers,
  addUsers,
  editUsers,
  deleteUsers,
  patchUsers,
};
