const { response, request } = require('express')

const getUsers = (req = request, res = response) => {

    const { nombre, apellido, page = 10, limit = 20 } = req.query

	res.json({
		message: 'get api - controlador de usuarios',
        nombre,
        apellido,
        page,
        limit,
	})
}

const createUser = (req, res = response) => {
    const { nombre, edad } = req.body

	res.status(201).json({
		message: 'post api - controlador de usuarios',
        nombre,
        edad,
	})
}

const deleteUser = (req, res = response) => {
	res.json({
		message: 'delete api - controlador de usuarios',
	})
}

const updateUser = (req, res = response) => {

    const id = req.params.id

	res.json({
		message: 'put api - controlador de usuarios',
        id
	})
}

const patchUser = (req, res = response) => {


	res.json({
		message: 'patch api - controlador de usuarios',
	})
}

module.exports = {
	getUsers,
    createUser,
    deleteUser,
    updateUser,
    patchUser
}
