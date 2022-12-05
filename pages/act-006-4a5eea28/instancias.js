/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/

document.getElementById("dhs-encabezado-lista2").innerHTML = "Instrucciones para Pedro";
document.getElementById("dhs-encabezado-desafio").innerHTML = "Pedro va a la Escuela";


const miActividad = new DHS_Sortable_Game_Act_Absolute({
    idBotonEjecutar: "dhs-button",
    themesImagenes: ["absolute-movements", "city"],
    otrasClavesImagenes:["circuloAmarilloTransparente"],
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
    pathBackgroundColor:"#697b83",
    wallBackgroundColor:"lightgreen",
});

miActividad.idElementoEscenario = "elemento-escenario";
miActividad.matCrud = [
    [1, 0, 1, 0, 0, 1, 1, 0, 1,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 1, 0, 1, 1, 0, 1,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 1, 0, 0, 0, 0, 0,],
    [1, 0, 1, 1, 0, 0, 0, 0, 0,],
    [1, 0, 0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 1, 0, 0, 0, 0, 0,],

];
miActividad.configuracionJuego = {
    anchoBaseElementos: 37,
    colorBordes: "#647175",
    nombre: "Mi Juego!",
    modo: "inicio",
    errorsHalt: true,
    wallCollideMessage: "¡OH NO!<br>¡Aquí no hay calle!",
    boundsCollideMessage: "¡OH NO!<br>¡Imposible!",
    nonHaltingErrorMessage: "¡IMPOSIBLE!",
    speedMiliseconds: 651,
}

miActividad.dataPanelModal = {
    title:"¡GENIAL!",
    imageUrl: miActividad.imagenes.escuela.url,
    mainText:"Justo a tiempo para clase de Inglés.",
    startsHidden: true,
}

miActividad.inicializar();

// PERSOJANES

const miPersonaje = miActividad.juego.agregarPersonaje(
    PersonajeCity,
    {
        initial_x: 1,
        initial_y: 7,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.ciclista.url}
        },
        currentStatus: "normal",
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "PUNTO-PARTIDA",
        idUsarHTML: "punto-partida",
        padding:"0px",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.circuloAmarilloTransparente.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 7, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "ORIGEN",
        idUsarHTML: "casa",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.casaSendero.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 8, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "DESTINO",
        idUsarHTML: "escuela",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.escuela.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 3,
        initial_y: 0, // Begins at 0
        zindex: 2,
    }
);
miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "BARRERA",
        idUsarHTML: "barrera",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.barrera.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1,
        initial_y: 2, // Begins at 0
        zindex: 2,
    }
);

const otrosElementos = [
    ["1", "0", "1", "0", "0", "1", "1", "0", "1",],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0",],
    ["1", "0", "1", "1", "0", "1", "1", "0", "1",],
    ["E", "0", "E", "E", "0", "E", "E", "0", "E",],
    ["F", "0", "F", "F", "0", "F", "F", "0", "F",],
    ["1", "0", "1", "1", "0", "A", "A", "P", "A",],
    ["1", "0", "1", "1", "0", "A", "A", "P", "A",],
    ["1", "0", "0", "0", "0", "P", "P", "P", "P",],
    ["1", "0", "1", "1", "0", "A", "A", "P", "A",],

];

for(let i=0; i< otrosElementos.length; i++){
    for(let j=0; j<otrosElementos[i].length; j++){
        let elemento = otrosElementos[i][j]
        if(elemento == "1"|| elemento=="0"){
            continue;
        } else{
            switch(elemento){
                case "E":
                    miActividad.juego.agregarPersonaje(
                        PersonajeObjetoSimple,
                        {
                            tipoPersonaje: "AUTO-EMBOTELLADO",
                            idUsarHTML: "auto-embotellado-"+i+"-"+j,
                            statuses:{
                                normal:{name:"normal",imageUrl:miActividad.imagenes.autoEmbotellado.url}
                            },
                            currentStatus: "normal",
                            hasTooltips: true,
                            initial_x: j,
                            initial_y: i, // Begins at 0
                            zindex: 2,
                        }
                    );
                    break;
                case "F":
                    miActividad.juego.agregarPersonaje(
                        PersonajeObjetoSimple,
                        {
                            tipoPersonaje: "AUTO-EMBOTELLADO",
                            idUsarHTML: "auto-embotellado-"+i+"-"+j,
                            statuses:{
                                normal:{name:"normal",imageUrl:miActividad.imagenes.autoEmbotelladoRight.url}
                            },
                            currentStatus: "normal",
                            hasTooltips: true,
                            initial_x: j,
                            initial_y: i, // Begins at 0
                            zindex: 2,
                        }
                    );
                    break;
                case "A":
                    miActividad.juego.agregarPersonaje(
                        PersonajeObjetoSimple,
                        {
                            tipoPersonaje: "ARBOL",
                            padding: ".75px",
                            idUsarHTML: "arbol-"+i+"-"+j,
                            statuses:{
                                normal:{name:"normal",imageUrl:miActividad.imagenes.arbolesSendero.url}
                            },
                            currentStatus: "normal",
                            hasTooltips: true,
                            initial_x: j,
                            initial_y: i, // Begins at 0
                            zindex: 2,
                        }
                    );
                    break;
                case "P":
                    miActividad.juego.agregarPersonaje(
                        PersonajeObjetoSimple,
                        {
                            tipoPersonaje: "PASTO",
                            padding:".75px",
                            idUsarHTML: "pasto-"+i+"-"+j,
                            statuses:{
                                normal:{name:"normal",imageUrl:miActividad.imagenes.pastoSendero.url}
                            },
                            currentStatus: "normal",
                            hasTooltips: true,
                            initial_x: j,
                            initial_y: i, // Begins at 0
                            zindex: 2,
                        }
                    );
                    break;
                default:
                    break;
            }
        }
    }
}

// PRERUN

miActividad.juego.modo = "prerun";

// BLOQUES
// Los bloques de movimiento se cargan segun el tipo de Actividad
// Bloques extra

// Precargados "Codigo" alumno



// CREAR REFERENCIAS

miActividad.crearReferencias("lista-iconos");
