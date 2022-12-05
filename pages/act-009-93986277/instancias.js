/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/

document.getElementById("dhs-encabezado-lista2").innerHTML = "Instrucciones para la Lancha";
document.getElementById("dhs-encabezado-desafio").innerHTML = "La lancha recicladora junta el plástico";


const miActividad = new DHS_Sortable_Game_Act_Apuntar_Direccion({
    idBotonEjecutar: "dhs-button",
    themesImagenes: ["delta"],
    otrasClavesImagenes:["circuloRojoTransparente","bandera","void"],
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
    pathBackgroundColor:"#0f1a10",
    wallBackgroundColor:"lightgreen",
});

miActividad.idElementoEscenario = "elemento-escenario";
miActividad.matCrud = [
    [1, 0, 1, 0, 1, 0, 1,],
    [0, 0, 1, 0, 0, 0, 0,],
    [1, 0, 1, 0, 1, 0, 1,],
    [0, 0, 0, 0, 0, 0, 0,],
    [1, 0, 1, 0, 1, 1, 1,],
    [1, 0, 0, 0, 0, 0, 0,],
    [1, 0, 0, 0, 1, 1, 1,],

];
miActividad.configuracionJuego = {
    anchoBaseElementos: 48,
    colorBordes: "#1a3b1d",
    nombre: "Mi Juego!",
    modo: "inicio",
    errorsHalt: true,
    wallCollideMessage: "¡OH NO!<br>¡Por aquí no puedo navegar!",
    boundsCollideMessage: "¡OH NO!<br>¡Imposible!",
    nonHaltingErrorMessage: "¡IMPOSIBLE!",
    speedMiliseconds: 651,
}

miActividad.dataPanelModal = {
    title:"¡LLEGAMOS!",
    imageUrl: miActividad.imagenes.ecobrick.url,
    mainText:"En esta planta recicladora transformamos los residuos plásticos en LADRILLOS ECOLÓGICOS.",
    startsHidden: true,
}

miActividad.inicializar();

// PERSOJANES

const miPersonaje = miActividad.juego.agregarPersonaje(
    RobotStandardRelativo,
    {
        initial_x: 5,
        initial_y: 0,
        zindex: 10,
        padding: "3px",
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.lancha.url}
        },
        currentStatus: "normal",
    }
);

miPersonaje._llegar= function (){
    // LOGICA DE PICKUPS
    let a = {};
    if(this.juntadosCount >= 3){
        // console.log(this.juntadosCount)
        this._decir("¡Llegamos!",20000);
        this.juego.modalPannel.mostrar();
        a.victoryException = false;
    } else {
        this._decir("¡Aún quedaba basura por juntar!", 20000);
        this.terminate()
        a.victoryException = true;
    }
    return a;
};

miPersonaje.addCollision({
    with:"DESTINO", 
    advanceFactor: 0.5, 
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
            normal:{name:"normal",imageUrl:miActividad.imagenes.circuloRojoTransparente.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 5,
        initial_y: 0, // Begins at 0
        zindex: 2,
    }
);

miActividad.juego.agregarPersonaje(
    PersonajeObjetoSimple,
    {
        tipoPersonaje: "DESTINO",
        idUsarHTML: "planta-reciclaje",
        padding:"1px",
        // direccion: 180,
        statuses:{
            normal:{name:"normal",imageUrl:miActividad.imagenes.plantaReciclajePastoDelta.url}
        },
        currentStatus: "normal",
        hasTooltips: true,
        initial_x: 1, //1
        initial_y: 6, //6
        zindex: 3,
    }
);

const matrizPlasticos = [
    [1, 9, 1, 0, 1, 0, 1,],
    [0, 0, 1, 0, 0, 0, 0,],
    [1, 0, 1, 0, 1, 0, 1,],
    [0, 9, 0, 0, 0, 0, 0,],
    [1, 0, 1, 0, 1, 1, 1,],
    [0, 0, 0, 0, 0, 0, 9,],
    [0, 0, 1, 0, 1, 1, 1,],

];
for(let r = 0; r< matrizPlasticos.length; r++){
    let fila = matrizPlasticos[r];
    for(let c = 0; c<fila.length; c++){
        if(fila[c]==9){
            miActividad.juego.agregarPersonaje(
                PersonajeObjetoSimple,
                {
                    tipoPersonaje: "PLASTICO",
                    idUsarHTML: "plastico-"+r+"-"+c,
                    statuses:{
                        normal:{name:"normal",imageUrl:miActividad.imagenes.plastico.url},
                        juntado:{name:"normal",imageUrl:miActividad.imagenes.void.url}
                    },
                    currentStatus: "normal",
                    hasTooltips: true,
                    initial_x: c,
                    initial_y: r, // Begins at 0
                    zindex: 2,
                }
            );
        }   
    }
}

miPersonaje.juntar = function(details){
    if(!this.alive){return false}
    const juntable = this.casilleroActual.occupants.find(occ=>occ.tipoPersonaje=="PLASTICO");
    const mensajeValidez = juntable? null : "Hummm... ¡Aquí no hay basura!";
    if(juntable){
        juntable.setStatus("juntado");
        if (!this.juntadosCount){
            this.juntadosCount=1;
        } else {
            this.juntadosCount++;
        }
    } else {
        this._decir(mensajeValidez);
        this.terminate();
    }
    const log = {
        personaje: this,
        continua: juntable!=undefined,
        mensajeValidez,
        nombreFuncion: "juntar",
        details
    }
    if(this.juego.modo == "prerun"){
        this.juego.log.push(log);
    } else if(this.juego.showInterface){
        this.juego.showInterface.show(log)
    }
    return log;
}

miActividad.interface.agregarBloqueListaA({
    clave:"juntar",
    rutaImagen: miActividad.imagenes.reciclar.url,
    nombreCompleto: "Juntar basura"
})

// PRERUN

miActividad.juego.modo = "prerun";

// BLOQUES
// Los bloques de movimiento se cargan segun el tipo de Actividad
// Bloques extra

// Precargados "Codigo" alumno



// CREAR REFERENCIAS

miActividad.crearReferencias("lista-iconos");
