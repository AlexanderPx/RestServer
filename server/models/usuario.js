const mongoose = require("mongoose")
let schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
    valores: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}
let usuarioSchema = new schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})
usuarioSchema.plugin(uniqueValidator, { message: `{PATH} debe ser único` })
usuarioSchema.methods.toJSON = function() {
    let user = this
    let userobject = user.toObject()
    delete userobject.password
    return userobject
}
module.exports = mongoose.model('Usuario', usuarioSchema)