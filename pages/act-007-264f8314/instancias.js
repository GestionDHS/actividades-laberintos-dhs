/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/

document.getElementById("dhs-encabezado-lista2").innerHTML = "Instrucciones para Miguel";
document.getElementById("dhs-encabezado-desafio").innerHTML = "El pato Miguel";


const miActividad = new DHS_Sortable_Game_Act_Left_Right({
    idBotonEjecutar: "dhs-button",
    themesImagenes: ["delta"],
    otrasClavesImagenes:["circuloVerdeTransparente"],
    editable: true,
    edicionHabilitable: true,
    enableParameters: true
});

function global_ejecutar(){
    miActividad.ejecutar();
}

miActividad.imagenes.wall = miActividad.imagenes.juncoPastoDelta;
miActividad.imagenes.path = miActividad.imagenes.agua;
miActividad.crearReglasPathWall({
    pathBackgroundColor:"#53b6cf",
    wallBackgroundColor:"lightgreen",
});

miActividad.idElementoEscenario = "elemento-escenario";
miActividad.matCrud = [
    [1, 0, 1, 1, 1, 1, 1,],
    [0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 0, 1, 1, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 1,],
    [1, 0, 1, 0, 0, 0, 1,],
    [1, 0, 1, 1, 1, 0, 1,],

];
miActividad.configuracionJuego = {
    anchoBaseElementos: 48,
    colorBordes: "#3d8da1",
    nombre: "Mi Juego!",
    modo: "inicio",
    errorsHalt: true,
    wallCollideMessage: "¡OH NO!<br>¡Por aquí no puedo nadar!",
    boundsCollideMessage: "¡OH NO!<br>¡Imposible!",
    nonHaltingErrorMessage: "¡IMPOSIBLE!",
    speedMiliseconds: 651,
}

miActividad.dataPanelModal = {
    title:"¡LLEGAMOS!",
    imageUrl: miActividad.imagenes.rioParana.url,
    mainText:"¿Sabías que el río Paraná tiene 4880 kilómetros de largo?",
    startsHidden: true,
}

miActividad.inicializar();

// PERSOJANES

const miPersonaje = miActividad.juego.agregarPersonaje(
    RobotStandardRelativo,
    {
        initial_x: 1,
        initial_y: 6,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pato.url}
        },
        currentStatus: "normal",
    }
);

miPersonaje.addCollision(
    {
        with:"PLASTICO", 
        advanceFactor: 0.3, 
        shouldHalt: true, 
        selfHandler: "terminate", 
        selfMessage:"¡CUACK, NO! Hay demasiada basura.",
        thirdPartyHandler:null,
        thirdPartyMessage:null,   
    }
)
miPersonaje._llegar= function (){
    this._decir("¡Llegamos!",20000);
    this.juego.modalPannel.mostrar()
};
miPersonaje.addCollision({
    with:"DESTINO", 
    advanceFactor: 1, 
    shouldHalt: true,
    isVictory: true, 
    selfHandler: "_llegar", 
    selfMessage: null,
    thirdPartyHandler:null,
    thirdPartyMessage:null,
});

miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PUNTO-PARTIDA",
        idUsarHTML: "punto-partida",
        padding:"0px",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.circuloVerdeTransparente.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 6, // Begins at 0
        zindex: 2,
    }
);

miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "DESTINO",
        idUsarHTML: "familia-pato",
        direccion: 180,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.familiaPato.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 5, // 5-- 1
        initial_y: 1, // 1-- 5 
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PLASTICO",
        idUsarHTML: "plastico-1",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.plastico.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 2, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PLASTICO",
        idUsarHTML: "plastico-2",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.plastico.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 2,
        initial_y: 3, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PLASTICO",
        idUsarHTML: "plastico-3",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.plastico.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 4,
        initial_y: 1, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PLASTICO",
        idUsarHTML: "plastico-4",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.plastico.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 4,
        initial_y: 4, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PLASTICO",
        idUsarHTML: "plastico-5",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.plastico.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 5,
        initial_y: 6, // Begins at 0
        zindex: 2,
    }
);

// PRERUN

miActividad.juego.modo = "prerun";

// BLOQUES
// Los bloques de movimiento se cargan segun el tipo de Actividad
// Bloques extra

// Precargados "Codigo" alumno



// CREAR REFERENCIAS

miActividad.crearReferencias("lista-iconos");
