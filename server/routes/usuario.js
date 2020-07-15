const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const Usuario = require('../models/usuario');
const _ = require('underscore');
const { json } = require('body-parser');
//const usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde)
    let limite = req.query.limite || 4;
    limite = Number(limite)
    Usuario.find({ estado: true }).skip(desde).limit(limite) //filtro de busqueda
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({}, (err, cont) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })

                }
                res.json({
                    ok: true,
                    usuarios,
                    numeros: cont
                })

            });

        })
});

app.post('/usuario', (req, res) => {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        })
    })
})

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let cambiarEstado = {
            estado: false
        }
        //Usuario.findById(id, (err, usuarioEliminado) => {
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                err
            })
        }
        if (!usuarioBD) {
            res.json({
                ok: true,
                err: {
                    message: "Usuario no encontrado"
                }
            })
        } else {
            res.json({
                ok: true,
                usuario: usuarioBD
            });
        }

    });
});


module.exports = app