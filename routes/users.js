const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { esRoleValido, 
        esEmailValido,
        existeUsuarioId } = require('../helpers/db-validators');

const { usersGet, 
        usersPost, 
        usersPut, 
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe contener mas de 6 caracteres').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( esEmailValido ),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role',).custom( esRoleValido ),
    validarCampos
], usersPost );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('role',).custom( esRoleValido ),
    validarCampos
], usersPut);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], usersDelete);


module.exports = router;