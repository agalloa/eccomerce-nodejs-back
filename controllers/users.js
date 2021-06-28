const { response } = require('express');
const bcryptjs = require ('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = async (req, res) => {

    //limitar los usuarios que se muestran en pantalla
    const { limite = 5, desde =  0 } = req.query;
    
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true}),
        Usuario.find({ estado: true})
        .skip(Number( desde ))
        .limit( Number( limite ))
    ]);

    res.json({ total, usuarios });
}

const usersPost = async (req, res = response ) => {

    const { nombre, correo, password, role } = req.body;

    const usuario = new Usuario( {  nombre, correo, password, role } ); //crear instanci

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync();
    
    usuario.password = bcryptjs.hashSync( password, salt );

    //GUARDAR EN BD
    await usuario.save(); //guarda la data en la bd

    res.json({
        msg: 'post Api - controlador',
        usuario
    });
}

const usersPut = async (req, res = response ) => {
    
    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    //TODO VALIDAR CONTRA BASE DE DATOS
    if ( password ){    
        //ENCRIPTAR LA CONTRASEÑA
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usersDelete = async (req, res) => {

    const { id } = req.params;
    
    //borrar usuario por id fisicamente: NO USAR
    // const usuario = await Usuario.findByIdAndDelete( id );

    //BORRAR USUARIO POR ID:
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({usuario, usuarioAutenticado});
}
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}
