const express = require("express");
const userController = require("../controller/user")

const api = express.Router();

api.get("/probando-controlador", userController.pruebas);
api.post("/userRegister", userController.create);
api.post("/login", userController.login);


module.exports = api;


