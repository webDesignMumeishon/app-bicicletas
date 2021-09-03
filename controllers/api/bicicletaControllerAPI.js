const Bicicleta = require('../../models/bicicleta')

exports.bicicleta_list = function(req, res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    })
}

exports.bicicleta_create = function(req,res){
    let bici = new Bicicleta(Number(req.body.id), req.body.color, req.body.modelo)
    bici.ubicacion = [req.body.lat, req.body.lng]
    Bicicleta.add(bici)

    res.status(200).json({
        bicicleta: bici
    })
}

exports.bicicleta_delete = function (req, res){
    const {id} = req.body
    Bicicleta.removeById(Number(id));
    res.status(204).send(`The bicicleta ${id} was removed`)
}

exports.bicicleta_update = function(req,res){
    const {id, color, modelo, lat, lng} = req.body

    let bike = Bicicleta.findById(Number(id)) 

    bike.id = Number(id)
    bike.color = color
    bike.modelo = modelo
    bike.ubicacion = [lat, lng]
    
    res.status(204).send()
}