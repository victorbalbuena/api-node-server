const { Router } = require("express");
const {
  getUsers,
  addUsers,
  editUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/user.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  editUsers
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe contener más de 8 caracteres").isLength(
      { min: 8 }
    ),
    check("email").custom(emailExiste),
    check("email", "El correo no es válido").isEmail(),

    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  addUsers
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUsers
);

router.patch("/", patchUsers);

module.exports = router;
