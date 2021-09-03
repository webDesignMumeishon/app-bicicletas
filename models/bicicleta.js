var Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id
    this.color = color
    this.modelo = modelo
    this.ubicacion = ubicacion
}

Bicicleta.prototype.toString = function() {
    return `id: ${this.id} | color: ${this.color}`
}

//Se agrega una propiedad para guardar todas las bicis
Bicicleta.allBicis = []

Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici)
}

Bicicleta.findById = function (aBiciId){
    let aBici = Bicicleta.allBicis.find(x => x.id === aBiciId);
    if(aBici){
        return aBici;
    }
    else{
        throw new Error(`No existe una bicicleta con el id: ${aBiciId}`)
    }

}

Bicicleta.removeById = function (aBiciId){
    Bicicleta.findById(aBiciId);
    // for(let i = 0; i < Bicicleta.allBicis.length; i++){
    //     if(Bicicleta.allBicis[i].id === aBiciId){
    //         Bicicleta.allBicis.splice(i, 1);
    //         break;
    //     }
    // }
    return Bicicleta.allBicis = Bicicleta.allBicis.filter( bici => bici.id !== aBiciId)
}

let a = new Bicicleta(1, "rojo", "urbana", [-27.46056, -58.98389])
let b = new Bicicleta(2, "azul", "campestres", [-27.36708, -55.89608])


Bicicleta.add(a)
Bicicleta.add(b)

module.exports = Bicicleta;