let Bicicleta = require('../../models/bicicleta')

beforeEach(() => { Bicicleta.allBicis = []})


describe('Bicicleta.allBicis', () => {
    it('comienza vacio', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
    })
})

describe('Bicicleta.add', () => {
    it('Agregamos una bici', () => {
        expect(Bicicleta.allBicis.length).toBe(0)

        let a = new Bicicleta(1, "rojo", "urbana", [-27.46056, -58.98389])
        Bicicleta.add(a)

        expect(Bicicleta.allBicis.length).toBe(1)
        expect(Bicicleta.allBicis[0]).toBe(a)

    })
})

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0)
        let aBici1 = new Bicicleta(1, "rojo", "urbana", [-27.46056, -58.98389])
        let aBici2 = new Bicicleta(1, "verde", "urbana", [-27.46056, -58.98389])
        Bicicleta.add(aBici1)
        Bicicleta.add(aBici2)

        let targetBici = Bicicleta.findById(1)
        expect(targetBici.id).toBe(1)
        expect(targetBici.color).toBe(aBici1.color)
        expect(targetBici.modelo).toBe(aBici1.modelo)
        expect(targetBici.modelo).toBe(aBici1.modelo)

    })
})