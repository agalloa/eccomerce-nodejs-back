const Role = require('../models/role');
const Usuario = require('../models/usuario');

//VERIFICAR SI EL ROL EXISTE
const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la Base de datos`) //error personalizado
    }
}

//VERIFICAR SI EL CORREO EXISTE
const esEmailValido = async ( correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya se encuentra registrado`); //error personalizado
    }
}
//VERIFICAR SI EL USUARIO EXISTE POR ID
const existeUsuarioId = async ( id ) => {

    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El id no existe ${ id }`); //error personalizado
    }
}
module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioId
}