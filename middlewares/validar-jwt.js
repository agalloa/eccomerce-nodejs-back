const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next ) => {
    //TODO LEER HEADERS
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    //VALIDAR JWT
    try{
        const { uid } =  jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        
        // TODO LEER EL USUARIO QUE CORRESPONDE AL UID
        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msg:'Token no valido - usuario no se encuentra en BD'
            }); 
        }

        // TODO VERIFICAR SI EL UID TIENE ESTADO EN TRUE
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'Token no valido - usuario con estado inactivo'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error){
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }
}

module.exports = {
    validarJWT
}