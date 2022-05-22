const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: String,
    role:{
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE', 'SELLER_ROLE'],
    },
    state:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject()
    return user
}

module.exports = model('User', UserSchema)