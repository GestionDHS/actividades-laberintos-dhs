/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/

document.getElementById("dhs-encabezado-lista2").innerHTML = "Instrucciones para Lupe";
document.getElementById("dhs-encabezado-desafio").innerHTML = "El desafío de Lupe";

const miActividad = new DHS_Sortable_Game_Act_Absolute({
    idBotonEjecutar: "dhs-button",
    themesImagenes: ["absolute-movements", "lupe"],
    otrasClavesImagenes:[],
    editable: false,
    edicionHabilitable: false,
});
function global_ejecutar(){
    miActividad.ejecutar();
}
miActividad.imagenes.wall = miActividad.imagenes.arboles;
miActividad.imagenes.path = miActividad.imagenes.pasto;
miActividad.crearReglasPathWall();
miActividad.idElementoEscenario = "elemento-escenario";
miActividad.matCrud = [
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1],
];
miActividad.configuracionJuego = {
    anchoBaseElementos: 70,
    nombre: "Mi Juego!",
    modo: "inicio",
    errorsHalt: true,
    wallCollideMessage: "¡OH NO!<br>¡Choqué contra un árbol!",
    boundsCollideMessage: "¡OH NO!<br>¡Imposible!",
    nonHaltingErrorMessage: "¡IMPOSIBLE!",
    speedMiliseconds: 651,
}

miActividad.dataPanelModal = {
    title:"¡BUEN TRABAJO!",
    imageUrl: "",
    mainText:"",
    startsHidden: true,
}

miActividad.inicializar();

// PERSOJANES

const miLupe = miActividad.juego.agregarPersonaje(
    Lupe,
    {
        initial_x: 3,
        initial_y: 3,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.lupe.url}
        },
        currentStatus: "normal",
    }
);

miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
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
        initial_x: 1,
        initial_y: 1,
        zindex: 2,
    }
);

// PRERUN

miActividad.juego.modo = "prerun";

// BLOQUES

miActividad.interface.agregarBloqueListaA(
    {
        nombreCompleto: miActividad.imagenes.llave.nombre,
        rutaImagen: miActividad.imagenes.llave.url,
        clave: "abrir",
    }
);

// Precargadas
miActividad.interface.agregarBloquePreseteadoSegunClave("arriba")
miActividad.interface.agregarBloquePreseteadoSegunClave("izquierda")
miActividad.interface.agregarBloquePreseteadoSegunClave("abrir")
miActividad.interface.agregarBloquePreseteadoSegunClave("izquierda")
miActividad.interface.agregarBloquePreseteadoSegunClave("arriba")

// CREAR REFERENCIAS

miActividad.crearReferencias("lista-iconos");
