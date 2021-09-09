
var map = L.map('main_map').setView([-27.47876526666526, -58.847399354587225], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


L.marker([-27.478736825210714, -58.847405464599944]).addTo(map)
    .bindPopup('"App Owner Here".<br> Mumeishon is Here.')
    .openPopup();

fetch('http://localhost:3000/api/bicicletas')
.then(res => res.json())
.then(data => {
    data.bicicletas.forEach((bicicleta) => {
        L.marker(bicicleta.ubicacion, {title: bicicleta.code}).addTo(map)
        .bindPopup(`Bicicleta ID: ${bicicleta.code}`)
        .openPopup();
    })
})