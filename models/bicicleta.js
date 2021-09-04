//creating mongoDB
let mongoose = require('mongoose')
const { Schema } = require("mongoose")

let bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: {type: '2dsphere', sparse: true}
    }
})

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    })
}

bicicletaSchema.statics.allBicis = function(cb){
    return this.find({}, cb);
}

bicicletaSchema.method.toString = function(){
    return `code: ${this.code} | color: ${this.color}`
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema)



