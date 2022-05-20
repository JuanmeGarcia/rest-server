const { Router } = require('express')
const { 
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    patchUser
} = require('../controllers/users')

const router = Router()

router.get('/', getUsers)

router.put('/:id', updateUser)

router.post('/', createUser)

router.delete('/', deleteUser)

router.patch('/', patchUser) 



module.exports = router