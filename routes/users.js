const { Router } = require('express')
const { check } = require('express-validator')
const { validateRegisters } = require('../middlewares/validateRegisters')
const { isValidRole, emailExists, existsUserById } = require('../helpers/dbValidators')
const { 
    getUsers,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/users')

const router = Router()

router.get('/', getUsers)

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existsUserById),
    check('role').custom(isValidRole),
    validateRegisters
], updateUser)

router.post('/', [
    check('firstName', "El nombre es obligatorio").not().isEmpty(),
    check('password', "El password debe de ser de mas de 6 letras").isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),

    // check('role', 'No es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    validateRegisters
], 
createUser)

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existsUserById),
    validateRegisters
], deleteUser)




module.exports = router