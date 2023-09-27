const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    // enum: ["ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("User", UserSchema);
