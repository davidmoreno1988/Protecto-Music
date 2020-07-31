const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const user = require("../models/user");
const jwt = require("../services/jwt")



function pruebas(req, res) {
    res.status(200).send({
        message: "Funciona el controlador"
    })
};


function create(req, res) {
    const newUser = new User();
    const paramsBody = req.body;

    newUser.firstName = paramsBody.firstName;
    newUser.lastName = paramsBody.lastName;
    newUser.email = paramsBody.email.toLowerCase();
    newUser.role = "ROLE-USER";
    newUser.image = "NULL";


    if (paramsBody.password) {


        bcrypt.hash(paramsBody.password, null, null, function (err, hash) {
            newUser.password = hash;
            if (newUser.firstName != null && newUser.lastName != null && newUser.email != null) {

                User.findOne({ email: newUser.email }, (err, userEmail) => {
                    if (userEmail) {
                        console.log("El correo ya existe");
                        res.status(200).send({ message: "El correo ya existe" });
                    } else {
                        newUser.save((err, userStored) => {
                            console.log("Me deje ir")
                            if (err) {
                                res.status(500).send({ message: "Error al guardar usuario" });
                            } else {
                                if (!userStored) {
                                    res.status(404).send({ message: "No se ha registrado el usuario" });
                                } else {
                                    res.status(200).send({ newUser: userStored });
                                }
                            }
                        })
                    }
                })
                newUser.save((err, respUser) => {
                    if (err) {
                        res.status(500).send({ message: "Error al guardar usuario" });
                    } else {
                        if (!respUser) {
                            res.status(400).send({ message: "No se ha registrado el usuario" });
                        } else {
                            res.status(200).send({ newUser: respUser });
                        }
                    }
                });
            }
        });
    } else {
        res.status(200).send({ message: "Porfavor introduce la contraseña" })
    }
}

function login(req, res) {
    let params = req.body;
    let email = params.email
    let pass = params.password

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            })
        } else {
            if (!user) {
                res.status(404).send({
                    message: 'El usuario no existe'
                })
            } else {
                bcrypt.compare(pass, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            res.status(200).send({ token: jwt.userToken(user) })
                        } else {
                            res.status(200).send({
                                user
                            })
                        }
                    } else {
                        res.status(404).send({
                            message: 'El usuario no ha podido logearse'
                        })
                    }
                })
            }
        }
    })
}

module.exports = {
    pruebas,
    create,
    login,
};

