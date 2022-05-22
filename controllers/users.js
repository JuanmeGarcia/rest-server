const { response, request } = require('express')
const User = require('../models/users')
const { encyptPassword } = require('../helpers/dbValidators')

const getUsers = async (req = request, res = response) => {
	const { limit, from } = req.query
	const query = { state: true }

	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query).skip(Number(from)).limit(Number(limit)),
	])

	res.json({
		total,
		users,
	})
}

const createUser = async (req, res = response) => {
	const { firstName, email, password, role } = req.body
	const user = new User({ firstName, email, password, role })

	//verificar si el correo existe

	//encriptrar la password

	user.password = await encyptPassword(password)
	//guardar en base de datos

	await user.save()

	res.status(201).json({
		user,
	})
}

const deleteUser = async (req, res = response) => {
	const { id } = req.params

	//fisicamente eliminarlo
	// const user = await User.findByIdAndDelete(id)
	//cambiando el estado a false

	const user = await User.findByIdAndUpdate(id, { state: false })

	res.json(user)
}

const updateUser = async (req, res = response) => {
	const { id } = req.params
	const { _id, password, google, email, ...remainder } = req.body
	// Validar contra base de datos

	if (password) {
		remainder.password = await encyptPassword(password)
	}

	const user = await User.findByIdAndUpdate(id, remainder)

	res.json(user)
}


module.exports = {
	getUsers,
	createUser,
	deleteUser,
	updateUser,
}
