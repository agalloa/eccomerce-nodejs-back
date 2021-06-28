const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La  password es obligatoria'],
    },
    
    img: {
        type: String,
    },

    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    
    estado: {
        type: Boolean,
        default: true
    },
    
    google: {
        type: Boolean,
        default: false
    },

});

//ocultar password
UsuarioSchema.methods.toJSON = function(){
    const { __v, password,_id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}
module.exports = model( 'Usuario', UsuarioSchema );