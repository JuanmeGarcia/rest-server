const Role = require('../models/role')
const User = require('../models/users')
const bcryptjs = require('bcryptjs')


const isValidRole = async (role = '') => {
    const isRole = await Role.findOne({ role })
    if(!isRole) {
        throw new Error(`el rol ${role} no esta registrado en la base de datos`)
    }
}

const emailExists = async (email = '') => {
    const emailExist = await User.findOne({ email })
	if( emailExist) {
        throw new Error(`El correo ya esta registrado en la base de datos`)
	}

}

const encyptPassword = async (password = '') => {
    const salt = bcryptjs.genSaltSync(10)
    return await bcryptjs.hashSync(password, salt)
}

const existsUserById = async (id = '') => {
    const existUser = await User.findById(id)
    if( !existUser ){
        throw new Error(`El usuario con el id ${id} no existe`)
    }
}

module.exports = {
    isValidRole,
    emailExists,
    encyptPassword,
    existsUserById,
}