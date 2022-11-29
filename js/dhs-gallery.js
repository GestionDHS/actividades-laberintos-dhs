class DHS_Gallery{
    constructor(){
        this.ready = true;
    }
    getImagesForTheme(theme){
        const x = {};
        for(let clave in this.imageLib){
            let objetoImagen = this.imageLib[clave];
            if (objetoImagen.themes.includes(theme)){
                x[clave]=objetoImagen;
            }
        }
        return x
    }
    getImageForKey(key){
        return this.imageLib[key];
    }
    imageLib = {
        // for theme absolute-movements
        arriba: {
            themes: ["absolute-movements"],
            url:"../../img/bloques/arriba-blanco.png",
            nombre: "Mover Arriba",
            parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
            showLicense: true,
        },
        abajo: {
            themes: ["absolute-movements"],
            url:"../../img/bloques/abajo-blanco.png",
            nombre: "Mover Abajo",
            parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
            showLicense: false,
        },
        izquierda: {
            themes: ["absolute-movements"],
            url:"../../img/bloques/izquierda-blanco.png",
            nombre: "Mover Izquierda",
            parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
            showLicense: false,
        },
        derecha: {
            themes: ["absolute-movements"],
            url:"../../img/bloques/derecha-blanco.png",
            nombre: "Mover Derecha",
            parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
            showLicense: false,
        },
        // for theme lupe-commons
        lupe: {
            themes: ["lupe"],
            url:"../lupe-commons/img/robotlupe.png",
            nombre: "Lupe",
            parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        arboles: {
            themes: ["lupe"],
            url:"../lupe-commons/img/arboles-pasto.png",
            nombre: "Árboles",
            parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        pasto: {
            themes: ["lupe"],
            url:"../lupe-commons/img/pasto.png",
            nombre: "Pasto",
            parrafoLicencia: "<p>Digital House</p>",
        },
        cofre: {
            themes: ["lupe"],
            url:"../lupe-commons/img/cofrecerrado-pasto.png",
            nombre: "Cofre Cerrado",
            parrafoLicencia: '<p>Licencia imagen:<a target="_blank" href="https://www.flaticon.com/free-img/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a></p>',
            showLicense: true,
        },
        cofreAbierto: {
            themes: ["lupe"],
            url:"../lupe-commons/img/cofreabierto.png",
            nombre: "Cofre Abierto",
            parrafoLicencia: '<p>Licencia imagen:<a target="_blank" href="https://www.flaticon.com/free-img/chest" title="chest icons">Chest icons created by Smashicons - Flaticon</a></p>',
            showLicense: true,
        },
        monedas: {
            themes: ["lupe"],
            url:"../lupe-commons/img/monedas-09.png",
            nombre: "Monedas",
            parrafoLicencia: '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/monedas" title="monedas iconos">Monedas iconos creados por turkkub - Flaticon</a></p>',
            showLicense: true,
        },
        lodo: {
            themes: ["lupe"],
            url:"../lupe-commons/img/lodo-pasto.png",
            nombre: "Lodo",
            parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tropical" title="tropical icons">Tropical icons created by Marz Gallery - Flaticon</a></p>',
            showLicense: true,
        },
        llave: {
            themes: ["lupe"],
            url:"../../img/bloques/llave-square-blanco.png",
            nombre: "Abrir Cofre",
            parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
            showLicense: true,
        },
        brujula: {
            themes: ["lupe"],
            url:"../lupe-commons/img/brujula.png",
            nombre: "Brújula",
            parrafoLicencia: '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/brujula" title="brújula iconos">Brújula iconos creados por Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        bandera: {
            themes: ["lupe"],
            url:"../lupe-commons/img/bandera-roja.png",
            nombre: "Bandera",
            parrafoLicencia: '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/bandera-roja" title="bandera-roja iconos">Bandera-roja iconos creados por Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        collar: {
            themes: ["lupe"],
            url:"../lupe-commons/img/collar-perlas.png",
            nombre: "Perlas",
            parrafoLicencia: '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/perla" title="perla iconos">Perla iconos creados por Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        // for theme city
        arbolesSendero: {
            themes:["city"],
            url:"../city-commons/img/arboles-sendero.png",
            nombre: "Árboles",
            parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        edificios: {
            themes:["city"],
            url:"../city-commons/img/edificios-pasto.png",
            nombre: "Edificios",
            parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/building" title="building icons">Building icons created by Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        pastoSendero: {
            themes:["city"],
            url:"../city-commons/img/pasto-sendero.png",
            nombre: "Sendero en el Pasto",
            parrafoLicencia: "<p>Digital House</p>",
        },
        barrera: {
            themes:["city"],
            url:"../city-commons/img/barrera.png",
            nombre: "Barrera",
            parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/barrier" title="barrier icons">Barrier icons created by nawicon - Flaticon</a></p>',
            showLicense: true,
        },
        escuela: {
            themes:["city"],
            url:"../city-commons/img/escuela-pasto.png",
            nombre: "Escuela",
            parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/school" title="school icons">School icons created by Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        autos03: {
            themes:["city"],
            url:"../city-commons/img/autos-03.png",
            nombre: "Autos",
            parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/fleet" title="fleet icons">Fleet icons created by Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        ciclista: {
            themes:["city"],
            url:"../city-commons/img/ciclista.png",
            nombre: "Ciclista",
            parrafoLicencia: '<p>Iconos diseñados por <a href="https://www.flaticon.es/autores/monkik" title="monkik"> monkik </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
            showLicense: true,
        },
        autoEmbotellado: {
            themes:["city"],
            url:"../city-commons/img/auto-embotellado.png",
            nombre: "Auto",
            parrafoLicencia: '<p>Iconos diseñados por <a href="https://www.flaticon.es/autores/konkapp" title="Konkapp"> Konkapp </a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
            showLicense: true,
        },
        casaSendero: {
            themes:["city"],
            url:"../city-commons/img/casa-sendero.png",
            nombre: "Casa",
            parrafoLicencia: '<p><a href="https://www.flaticon.com/free-icons/home" title="home icons">Home icons created by Freepik - Flaticon</a></p>',
            showLicense: true,
        },
        circuloAmarilloTransparente: {
            themes:[],
            url:"../city-commons/img/circulo-amarillo-transparente.png",
            nombre: "Circulo Amarillo",
            parrafoLicencia: '<p>Digital House</p>',
            showLicense: false,
        },
    }
}