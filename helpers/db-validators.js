const Role = require("../models/role");
const Usuario = require("../models/user");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol: ${rol} no está registrado en la base de datos`);
  }
};

const emailExiste = async (email = "") => {
  const emailExist = await Usuario.findOne({ email });
  if (emailExist) {
    throw new Error(`EL correo: ${email} ya está siendo usado`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const userExist = await Usuario.findById(id);
  if (!userExist) {
    throw new Error(`EL id: ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
};
