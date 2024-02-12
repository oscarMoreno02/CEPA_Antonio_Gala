
const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {validateValues}=require('../helpers/validar-campos')
const validator=require('../helpers/secciones-validators')

const controller=require('../controllers/authController')
const { emailExist} = require('../helpers/db-validators');

    //Óscar
    router.put('/login/:id',controller.test)
    router.post('/register',
    [
        check('email').custom( emailExist),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El apellido es obligatorio').not().isEmpty(),
        check('password', 'La contraseña debe de ser más de 6 letras').isLength({ min: 6 }),
        check('email', 'El correo no es válido').isEmail(),
        validateValues
    
     ],
    )
    

    module.exports = router;