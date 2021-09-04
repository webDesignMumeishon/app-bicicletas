let Bicicleta = require('../../models/bicicleta')
let request = require('request')
//the server module is export to do the testings automatically without having to start the local server in 
//the console. Once is exported is ejecuted for the test and then finished.
let server = require('../../bin/www')

beforeEach(() => { Bicicleta.allBicis = []})


describe('Bicicleta API', () => {

    describe('GET BICICLETAS/', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0)

            let a = new Bicicleta(1, "rojo", "urbana", [-27.46056, -58.98389])
            Bicicleta.add(a)

            request.get('http://localhost:3000/api/bicicletas', (req, res) => {
                expect(res.statusCode).toBe(200)
            })
        })
    })

    describe('POST BICICLETAS/ create', () => {
        it('Status 200', (done) => {
            let headers = {'content-type' : 'application/json'}
            let aBici = `{"id": 10, "color": "amarillo", "modelo": "todoterreno", "lat": -27.46056, "lng": -58.98389}`
            
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, (err, response, body) => {
                expect(response.statusCode).toBe(200)
                expect(Bicicleta.findById(10).color).toBe("amarillo")
                done()
            })
        })
    })
})