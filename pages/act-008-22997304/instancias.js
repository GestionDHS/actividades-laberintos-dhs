/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/

document.getElementById("dhs-encabezado-lista2").innerHTML = "Instrucciones para Martín";
document.getElementById("dhs-encabezado-desafio").innerHTML = "Martín, el carpincho: <i>perdido en la ciudad</i>";


const miActividad = new DHS_Sortable_Game_Act_Girar_Grados({
    idBotonEjecutar: "dhs-button",
    themesImagenes: ["city","delta"],
    otrasClavesImagenes:["circuloVerdeTransparente","bandera"],
    editable: true,
    edicionHabilitable: true,
    enableParameters: true
});

function global_ejecutar(){
    miActividad.ejecutar();
}

miActividad.imagenes.wall = miActividad.imagenes.edificios;
miActividad.imagenes.path = {url:""};
miActividad.crearReglasPathWall({
    pathBackgroundColor:"#0f1a10",
    wallBackgroundColor:"lightgreen",
});

miActividad.idElementoEscenario = "elemento-escenario";
miActividad.matCrud = [
    [1, 0, 1, 0, 1, 0, 1,],
    [0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 0, 1, 0, 1,],
    [0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 0, 0, 0, 0,],

];
miActividad.configuracionJuego = {
    anchoBaseElementos: 48,
    colorBordes: "#1a3b1d",
    nombre: "Mi Juego!",
    modo: "inicio",
    errorsHalt: true,
    wallCollideMessage: "¡OH NO!<br>¡Por aquí no puedo!",
    boundsCollideMessage: "¡OH NO!<br>¡Imposible!",
    nonHaltingErrorMessage: "¡IMPOSIBLE!",
    speedMiliseconds: 651,
}

miActividad.dataPanelModal = {
    title:"¡LLEGAMOS!",
    imageUrl: miActividad.imagenes.realCarpincho.url,
    mainText:"¿Sabías que los carpinchos son un tipo de ROEDOR? ¡Como los ratones!",
    startsHidden: true,
}

miActividad.inicializar();

// PERSOJANES

const miPersonaje = miActividad.juego.agregarPersonaje(
    RobotStandardRelativo,
    {
        initial_x: 0,
        initial_y: 3,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.carpincho.url}
        },
        currentStatus: "normal",
    }
);

miPersonaje.addCollision(
    {
        with:"JUNCO", 
        advanceFactor: 0.3, 
        shouldHalt: true, 
        selfHandler: "terminate", 
        selfMessage:"¡OH NO!<br>¡Por aquí no puedo!",
        thirdPartyHandler:null,
        thirdPartyMessage:null,   
    }
)

miPersonaje.addCollision(
    {
        with:"AUTO", 
        advanceFactor: 0.3, 
        shouldHalt: true, 
        selfHandler: "terminate", 
        selfMessage:"¡Pasan demasiados Autos!",
        thirdPartyHandler:null,
        thirdPartyMessage:null,   
    }
)

miPersonaje.addCollision(
    {
        with:"PASTO-INICIAL", 
        advanceFactor: 1, 
        shouldHalt: false, 
        selfHandler: "celebrarPasto", 
        selfMessage: null,
        thirdPartyHandler:null,
        thirdPartyMessage:null,   
    }
)


miPersonaje._llegar= function (){
    this._decir("¡Llegamos!",20000);
    this.juego.modalPannel.mostrar()
};

miPersonaje.celebrarPasto= function (){
    this._decir("¡Extrañaba el pasto!",3000);
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
        initial_x: 0,
        initial_y: 3, // Begins at 0
        zindex: 2,
    }
);

miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "DESTINO",
        idUsarHTML: "bandera",
        // direccion: 180,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.bandera.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 6,
        initial_y: 5, 
        zindex: 3,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "JUNCO",
        idUsarHTML: "junco-1",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.juncoPastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 4,
        initial_y: 6, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "JUNCO",
        idUsarHTML: "junco-2",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.juncoPastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 6,
        initial_y: 6, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PASTO",
        idUsarHTML: "junco-8",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 6,
        initial_y: 5, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "JUNCO",
        idUsarHTML: "junco-4",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.juncoPastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 6,
        initial_y: 4, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PASTO",
        idUsarHTML: "pasto-9",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 4,
        initial_y: 5, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "JUNCO",
        idUsarHTML: "junco-6",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.juncoPastoDelta.url}
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
        tipoPersonaje: "JUNCO",
        idUsarHTML: "junco-6",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.juncoPastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 4,
        initial_y: 3, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PASTO",
        idUsarHTML: "pasto-1",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 5,
        initial_y: 6, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PASTO",
        idUsarHTML: "pasto-2",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 5,
        initial_y: 5, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PASTO",
        idUsarHTML: "pasto-3",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 5,
        initial_y: 4, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PASTO-INICIAL",
        idUsarHTML: "pasto-4",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 5,
        initial_y: 3, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PASTO",
        idUsarHTML: "pasto-5",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.pastoDelta.url}
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
        tipoPersonaje: "AUTO",
        padding: "4px",
        idUsarHTML: "auto-1",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.autoArriba.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 3,
        initial_y: 6, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "AUTO",
        idUsarHTML: "auto-2",
        padding:"4px",
        direccion: 315,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.autoArriba.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 3,
        initial_y: 5, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "AUTO",
        idUsarHTML: "auto-3",
        padding: "4px",
        direccion: 270,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.autoArriba.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 2,
        initial_y: 5, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "AUTO",
        idUsarHTML: "auto-4",
        padding: "4px",
        direccion: 270,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.autoArriba.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 5, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "AUTO",
        idUsarHTML: "auto-5",
        padding: "4px",
        direccion: 270,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.autoArriba.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 0,
        initial_y: 5, // Begins at 0
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
