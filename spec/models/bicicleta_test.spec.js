let Bicicleta = require('../../models/bicicleta')
let mongoose = require('mongoose')

describe('Testing Bicicletas', function(){
    beforeEach((done) => {
        let mongoDB = 'mongodb://localhost/testdb'
        mongoose.connect(mongoDB, {useNewUrlParser: true})

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', () => {
            console.log("We are connected to test database")
            done()
        })
    })

    afterEach((done) => {
        Bicicleta.deleteMany({}, (err, succes) => {
            if(err) console.log(err)
            done()
        })
    })

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            let bici = Bicicleta.createInstance(1, "verde", "urbana", [-45, -58])
            console.log(bici)
            expect(bici.code).toBe(1)
            expect(bici.color).toBe("verde")
            expect(bici.modelo).toBe("urbana")
            expect(bici.ubicacion[0]).toEqual(-45)
            expect(bici.ubicacion[1]).toEqual(-58)
        })
    })
})










// beforeEach(() => { Bicicleta.allBicis = []})

// describe('Bicicleta.allBicis', () => {
//     it('comienza vacio', () => {
//         expect(Bicicleta.allBicis.length).toBe(0)
//     })
// })

// describe('Bicicleta.add', () => {
//     it('Agregamos una bici', () => {
//         expect(Bicicleta.allBicis.length).toBe(0)

//         let a = new Bicicleta(1, "rojo", "urbana", [-27.46056, -58.98389])
//         Bicicleta.add(a)

//         expect(Bicicleta.allBicis.length).toBe(1)
//         expect(Bicicleta.allBicis[0]).toBe(a)

//     })
// })

// describe('Bicicleta.findById', () => {
//     it('debe devolver la bici con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0)
//         let aBici1 = new Bicicleta(1, "rojo", "urbana", [-27.46056, -58.98389])
//         let aBici2 = new Bicicleta(1, "verde", "urbana", [-27.46056, -58.98389])
//         Bicicleta.add(aBici1)
//         Bicicleta.add(aBici2)

//         let targetBici = Bicicleta.findById(1)
//         expect(targetBici.id).toBe(1)
//         expect(targetBici.color).toBe(aBici1.color)
//         expect(targetBici.modelo).toBe(aBici1.modelo)
//         expect(targetBici.modelo).toBe(aBici1.modelo)

//     })
// })