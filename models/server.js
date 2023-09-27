const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = "/api/users";

    // Conectar a la base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Routes

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //  CORS
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());

    //  directorio públic
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
