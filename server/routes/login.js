const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        //Si existe un error en la BDD u otra cosa en el servidor   
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }
        //Verificar si las contraseñas coiciden     
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.CADUCIDAD_SEED, { expiresIn: process.env.CADUCIDAD_TOKEN = 60 * 60 });

        //respuesta correcta
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    })

})




module.exports = app