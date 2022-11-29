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
    editable: true,
    edicionHabilitable: true,
});

function global_ejecutar(){
    miActividad.ejecutar();
}

miActividad.imagenes.wall = miActividad.imagenes.arboles;
miActividad.imagenes.path = miActividad.imagenes.pasto;
miActividad.crearReglasPathWall();
miActividad.idElementoEscenario = "elemento-escenario";
miActividad.matCrud = [
    [1, 1, 1, 1, 1, 1, 1, 1,],
    [1, 0, 0, 0, 1, 1, 0, 1,],
    [1, 1, 1, 0, 1, 1, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 1, 0, 1, 1, 0, 1,],
    [1, 0, 0, 0, 0, 0, 0, 1,],
    [1, 1, 1, 1, 0, 1, 1, 1,],
    [1, 1, 1, 1, 1, 1, 1, 1,],
];
miActividad.configuracionJuego = {
    anchoBaseElementos: 42,
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
    imageUrl: miActividad.imagenes.collar.url,
    mainText:"Encontramos un collar de perlas.",
    startsHidden: true,
}

miActividad.inicializar();

// PERSOJANES

const miLupe = miActividad.juego.agregarPersonaje(
    Lupe,
    {
        initial_x: 4,
        initial_y: 6,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.lupe.url}
        },
        currentStatus: "normal",
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "LODO",
        idUsarHTML: "lodo-1",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.lodo.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 6,
        initial_y: 3, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "LODO",
        idUsarHTML: "lodo-2",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.lodo.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 3,
        initial_y: 4, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    Cofre,
    {
        tipoPersonaje: "COFRE",
        idUsarHTML: "cofre",
        statuses:{
            closed:{name:"closed",imageUrl:miActividad.imagenes.cofre.url},
            open:{name:"open",imageUrl:miActividad.imagenes.cofreAbierto.url}
        },
        currentStatus: "closed",
        hasTooltips: true,
        initial_x: 4, // 6
        initial_y: 3, // Begins at 0 //3
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



// CREAR REFERENCIAS

miActividad.crearReferencias("lista-iconos");
