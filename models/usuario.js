let mongoose = require('mongoose')
let Reserva = require('./reserva')
let Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const saltRounds = 10

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        require: [true, 'The name is Mandatory']
    },

    email: {
        type: String,
        trim: true,
        require: [true, 'The email is Mandatory'],
        //when saving all the caracters are converted into lowercase
        lowercase: true,
        //in the method property we pass in the arguments, first the function to validate the input, and then 
        // an invalid massage
        validate: [validateEmail, 'Please, insert a valid email'],
        //match, whaever input has to match this sequence, it runs in the mondoDB level
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    password: {
        type: String,
        require: [true, 'The password is Mandatory']
    },

    passwordResetToken: String,

    passwordResetTokenExpires: Date,

    verified: {
        type: Boolean,
        default: false
    }
})

//Before saving the new instance this function will be executed
usuarioSchema.pre("save", function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds)
    }
    next()
})

//password comparisson 
usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}


usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    let reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta})
    console.log(reserva)
    // reserva.save(cb)
    return reserva.save()
}

module.exports = mongoose.model("Usuario", usuarioSchema)