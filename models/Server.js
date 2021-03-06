const express = require('express')
const cors = require('cors')
const {dbConnection} = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000;
        this.usersRoutePath = '/api/users'

        this.connectDatabase()

        //middlewares => funciones que se ejecutan antes de que lleguen las rutas
        this.middlewares()

		this.routes()
	}

    async connectDatabase (){
        await dbConnection();
    } 

    middlewares() {
        //CORS
        
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //rutas estaticas (publicas)
        this.app.use(express.static('public'))
    }
 
	routes() {
        this.app.use(this.usersRoutePath, require('../routes/users'))
	}

	listen() {
		this.app.listen(this.port, () => console.log(`escuchando en el puerto ${this.port}`))
	}
}


module.exports = Server;

