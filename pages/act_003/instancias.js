/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
const miActividad = new DHS_Game_Act("dhs-button");
function global_ejecutar(){
    miActividad.ejecutar();
}
miActividad.imagenes = {
    lupe: {
        url:"../lupe_commons/img/robotlupe.png",
        nombre: "Lupe",
        parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/robot" title="robot icons">Robot icons created by Freepik - Flaticon</a></p>',
        showLicense: true,
    },
    arboles: {
        url:"../lupe_commons/img/arboles_pasto.png",
        nombre: "Árboles",
        parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tree" title="tree icons">Tree icons created by Freepik - Flaticon</a></p>',
        showLicense: true,
    },
    pasto: {
        url:"../lupe_commons/img/pasto.png",
        nombre: "Pasto",
        parrafoLicencia: "<p>Digital House</p>",
    },
    bandera:{
        url:"../lupe_commons/img/bandera_roja.png",
        nombre: "Bandera",
        parrafoLicencia: '<p>Licencia: <a href="https://www.flaticon.es/iconos-gratis/bandera-roja" title="bandera-roja iconos">Bandera-roja iconos creados por Freepik - Flaticon</a></p>',
        showLicense: true,
    },
    lodo: {
        url:"../lupe_commons/img/lodo_pasto.png",
        nombre: "Lodo",
        parrafoLicencia: '<p>Licencia imagen: <a target="_blank" href="https://www.flaticon.com/free-img/tropical" title="tropical icons">Tropical icons created by Marz Gallery - Flaticon</a></p>',
        showLicense: true,
    },
    arriba: {
        url:"../../img/bloques/arriba_blanco.png",
        nombre: "Mover Arriba",
        parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
        showLicense: true,
    },
    abajo: {
        url:"../../img/bloques/abajo_blanco.png",
        nombre: "Mover Abajo",
        parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
        showLicense: false,
    },
    izquierda: {
        url:"../../img/bloques/izquierda_blanco.png",
        nombre: "Mover Izquierda",
        parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
        showLicense: false,
    },
    derecha: {
        url:"../../img/bloques/derecha_blanco.png",
        nombre: "Mover Derecha",
        parrafoLicencia: '<p> Iconos diseñados por <a target="_blank" href="" title="Tempo_doloe"> Tempo_doloe </a> from <a target="_blank" href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></p>',
        showLicense: false,
    },
}
miActividad.imagenes.wall = miActividad.imagenes.arboles;
miActividad.imagenes.path = miActividad.imagenes.pasto;
miActividad.crearReglasPathWall();
miActividad.idElementoEscenario = "elemento-escenario";
miActividad.matCrud = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
];
miActividad.configuracionJuego = {
    anchoBaseElementos: 70,
    nombre: "Mi Juego!",
    modo: "inicio",
    errorsHalt: true,
    showMov: false,
    wallCollideMessage: "¡OH NO!<br>¡Choqué contra un árbol!",
    boundsCollideMessage: "¡OH NO!<br>¡Imposible!",
    nonHaltingErrorMessage: "¡IMPOSIBLE!",
    speedMiliseconds: 651,
}

miActividad.dataPanelModal = {
    title:"¡BUEN TRABAJO!",
    imageUrl: miActividad.imagenes.lodo.url,
    mainText:"",
    startsHidden: true,
}

miActividad.inicializar();

// PERSOJANES

const miLupe = miActividad.juego.agregarPersonaje(
    {
        idUsarHTML: "lupe",
        tipoPersonaje: "JUGABLE",
        yaCreadoEnHtml: false,
        elementoHTML: null,
        yaConImagenEnHtml: false,
        imagenenHTML: null,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.lupe.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 4,
        zindex:3,
    }
);

const miLodo = miActividad.juego.agregarPersonaje(
    {
        tipoPersonaje: "LODO",
        yaCreadoEnHtml: false,
        elementoHTML: null,
        idUsarHTML: "lodo-1",
        yaConImagenEnHtml: false,
        imagenenHTML: null,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.lodo.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 2,
        zindex: 2,
    }
);

const miBandera = miActividad.juego.agregarPersonaje(
    {
        tipoPersonaje: "BANDERA",
        yaCreadoEnHtml: false,
        elementoHTML: null,
        idUsarHTML: "bandera-1",
        yaConImagenEnHtml: false,
        imagenenHTML: null,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.bandera.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 3,
        initial_y: 1,
        zindex: 2,
    }
);

miLupe.collisions[0] = {
    with:"LODO", 
    advanceFactor: 0.7, 
    shouldHalt:true, 
    selfHandler: "terminate", 
    selfMessage:"¡OH NO! Me atasqué en el lodo.",
    thirdPartyHandler:null,
    thirdPartyMessage:null,
}


// -------------------
// METODOS ESPECÍFICOS
// -------------------


// PRERUN

miActividad.juego.modo = "prerun";

// BLOQUES

miActividad.interface = new Sortable_Blocks({
    idListaOrigen:"dhs-lista",
    idListaDestino:"dhs-lista2",
    idListaErase:"dhs-erase",
    idBotonErase:"dhs-erase-button",
    editable:true
});

miActividad.interface.agregarBloqueListaA(
    {
        nombreCompleto: miActividad.imagenes.arriba.nombre,
        rutaImagen: miActividad.imagenes.arriba.url,
        clave: "arriba",
    }
);
miActividad.interface.agregarBloqueListaA(
    {
        nombreCompleto: miActividad.imagenes.abajo.nombre,
        rutaImagen: miActividad.imagenes.abajo.url,
        clave: "abajo",
    }
);
miActividad.interface.agregarBloqueListaA(
    {
        nombreCompleto: miActividad.imagenes.izquierda.nombre,
        rutaImagen: miActividad.imagenes.izquierda.url,
        clave: "izquierda",
    }
);
miActividad.interface.agregarBloqueListaA(
    {
        nombreCompleto: miActividad.imagenes.derecha.nombre,
        rutaImagen: miActividad.imagenes.derecha.url,
        clave: "derecha",
    }
);


// CREAR REFERENCIAS

miActividad.crearReferencias("lista-iconos");
