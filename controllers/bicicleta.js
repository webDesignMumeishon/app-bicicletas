//Desde controllers se maneja todo lo que tiene que ver con bicicletas

let Bicicleta = require('../models/bicicleta.js')

exports.bicicleta_list = function(req,res){
    //Aqui se renderiza la vista del listado de bicicletas con el objeto de Bicicleta.allBicis
    //Se hace una nueva lista. Esta es la lista de la tabla de las bicicletas

    res.render('bicicletas/index', {bicis: Bicicleta.allBicis})

    //El render busca al motor de templating de vistas (pug). Dentro de views una carpeta "bicicletas" 
    //y dentro de bicicletas la vista index.pug ---------> se define una tabla
}
// |--------------------------------------------------------------------------------------------------------------|
//Tiene dos momentos la creacion de bicicletas: 
exports.bicicleta_create_get = function(req,res){
    // 1-solicitud de hacer un create que nos llega a la pag 
    res.render('bicicletas/create')
}

exports.bicicleta_create_post = function(req,res){
    // 2-confirmacion del create, atributos definidos en el formulario, creacion de la bicicleta

    let bici = new Bicicleta(Number(req.body.id), req.body.color, req.body.modelo)
    bici.ubicacion = [req.body.lat, req.body.lng]
    
    Bicicleta.add(bici)

    res.redirect('/bicicletas')
}
// |--------------------------------------------------------------------------------------------------------------|
exports.bicicleta_update_get = function(req,res){
    const {id} = req.params
    let bici = Bicicleta.findById(Number(id))
    res.render('bicicletas/update', {bici})
}

exports.bicicleta_update_post = function(req,res){
    let idParams = req.params.id
    let bike = Bicicleta.findById(Number(idParams)) 

    const {id, color, modelo, lat, lng} = req.body

    bike.id = Number(id)
    bike.color = color
    bike.modelo = modelo
    bike.ubicacion = [lat, lng]
    
    res.redirect('/bicicletas')
}
// |--------------------------------------------------------------------------------------------------------------|
exports.bicicleta_delete_post = function (req, res){
    const {id} = req.body

    Bicicleta.removeById(Number(id));

    res.redirect("/bicicletas")
}