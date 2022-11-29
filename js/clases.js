/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
class DHS_Game_Act{
  constructor(gameActConfigObj){
    this.botonEjecutar = document.getElementById(gameActConfigObj.idBotonEjecutar);
    this.galeria = new DHS_Gallery();
    this.imagenes = {};
    for(let th of gameActConfigObj.themesImagenes){
      let merged = {...this.imagenes, ...this.galeria.getImagesForTheme(th)}
      this.imagenes = merged;
    }
    for(let cl of gameActConfigObj.otrasClavesImagenes){
      this.imagenes[cl] = this.galeria.getImageForKey(cl);
    }
    this.habilitarEjecucion();
    this.instructionCount = -1;
    this.stepCount = -1;
  }
  inicializar(){
    this.juego = new Juego(this.configuracionJuego);
    this.juego.showInterface = new BlockShowInterface(this.juego); // debe poder elegirse otro tipo de interfaz
    this.elemescenario = document.getElementById(this.idElementoEscenario);
    this.juego.crearEscenario(this.elemescenario, this.matCrud);
    this.juego.agregarModal(this.dataPanelModal);
  }
  crearReferencias(idElementoHTML){
    const listaReferencias = document.getElementById(idElementoHTML)
    for (let clave in this.imagenes){
      let recurso = this.imagenes[clave];
      if(recurso.showLicense){
        let item = document.createElement("LI");
        item.innerHTML = `
          <img src="${recurso.url}" alt="${recurso.nombre}">
          <div>
          <p class="icon-name">${recurso.nombre}</p>
          <div class="icon-reference">${recurso.parrafoLicencia}</div>
          </p>
          </div>
        `;
        listaReferencias.appendChild(item);
      }
    }
  }
  crearReglasPathWall(fondos=false){
    let hd = document.querySelector("head");
    let style =  document.createElement("STYLE");
    if (fondos){
      style.innerHTML = 
      ".wall{background-image:url("+this.imagenes.wall.url+"); background-color:"+fondos.wallBackgroundColor+"}"+
      ".path{background-image:url("+this.imagenes.path.url+"); background-color:"+fondos.pathBackgroundColor+"}";
    }else{
      style.innerHTML = 
      ".wall{background-image:url("+this.imagenes.wall.url+")}"+
      ".path{background-image:url("+this.imagenes.path.url+")}";
    }
    hd.appendChild(style);
  }
  habilitarEjecucion(){
    this.botonEjecutar.setAttribute("onclick","global_ejecutar()")
    this.botonEjecutar.disabled = false;
  }
  deshabilitarEjecucion(){
    this.botonEjecutar.setAttribute("onclick","")
    this.botonEjecutar.disabled = true;
  }
  habilitar(){
    this.habilitarEjecucion();
    if(this.interface){
      this.interface.habilitarEdicion();
    }
  }
  deshabilitar(){
    this.deshabilitarEjecucion();
    if(this.interface){
      this.interface.deshabilitarEdicion();
    }
  }
  ejecutar(){
    // console.log(this);
    this.deshabilitar();
    this.juego.reiniciar();
    this.juego.showInterface.desmarcarTodos();
    this.juego.modo="prerun";
    this.instructionCount = -1;
    this.stepCount = -1;
    this.interface.alimentarLog();
    const _esto = this;
    setTimeout(function(){
      _esto.juego.runLog();
    },1000);
    setTimeout(function(){
      _esto.habilitar();
    },(_esto.juego.log.length+0.2)*1000);
  }
}

/**
 * DHS_Sortable_Game_Act.
 *
 * @class DHS_Sortable_Game_Act
 * @extends {DHS_Game_Act}
 */

class DHS_Sortable_Game_Act extends DHS_Game_Act{
  constructor(x){
    super(x);
    this.interface = new Sortable_Blocks({
      idListaOrigen:"dhs-lista",
      idListaDestino:"dhs-lista2",
      idListaErase:"dhs-erase",
      idBotonErase:"dhs-erase-button",
      editable: x.editable,
      edicionHabilitable: x.edicionHabilitable
    })
  }
}

/**
 * DHS_Sortable_Game_Act_Absolute.
 *
 * @class DHS_Sortable_Game_Act_Absolute
 * @extends {DHS_Sortable_Game_Act}
 */

 class DHS_Sortable_Game_Act_Absolute extends DHS_Sortable_Game_Act{
  constructor(x){
    if(!x.themesImagenes.includes("absolute-movements")){
      x.themesImagenes.push("absolute-movements");
    }
    super(x);
    let inputPasos = null;
    if(x.enableParameters){
      inputPasos = document.createElement("SELECT");
      const opciones = ["1 Casillero", "2 Casilleros", "3 Casilleros", "4 Casilleros", "5 Casilleros", "6 Casilleros", "7 Casilleros", "8 Casilleros", "9 Casilleros"];
      opciones.forEach((op,index)=>{
        let opEl = document.createElement("OPTION");
        opEl.innerHTML = op;
        opEl.value = index+1;
        inputPasos.appendChild(opEl);
      });
    }
    this.interface.agregarBloqueListaA(
        {
            nombreCompleto: this.imagenes.arriba.nombre,
            rutaImagen: this.imagenes.arriba.url,
            clave: "arriba",
            inputElements: x.enableParameters ? [inputPasos.cloneNode(true)] : null,
        }
    );
    this.interface.agregarBloqueListaA(
        {
            nombreCompleto: this.imagenes.abajo.nombre,
            rutaImagen: this.imagenes.abajo.url,
            clave: "abajo",
            inputElements: x.enableParameters ? [inputPasos.cloneNode(true)] : null,
        }
    );
    this.interface.agregarBloqueListaA(
        {
            nombreCompleto: this.imagenes.izquierda.nombre,
            rutaImagen: this.imagenes.izquierda.url,
            clave: "izquierda",
            inputElements: x.enableParameters ? [inputPasos.cloneNode(true)] : null,
        }
    );
    this.interface.agregarBloqueListaA(
        {
            nombreCompleto: this.imagenes.derecha.nombre,
            rutaImagen: this.imagenes.derecha.url,
            clave: "derecha",
            inputElements: x.enableParameters ? [inputPasos.cloneNode(true)] : null,
        }
    );
  }
}


class Juego {
  constructor(gameConfigObj) {
    this.anchoBaseElementos = gameConfigObj.anchoBaseElementos;
    this.errorsHalt = gameConfigObj.errorsHalt;
    this.nombre = gameConfigObj.nombre; 
    this._matrizCruda = gameConfigObj.matrizCruda;
    this.modo = gameConfigObj.modo;
    this.wallCollideMessage = gameConfigObj.wallCollideMessage;
    this.boundsCollideMessage = gameConfigObj.boundsCollideMessage;
    this.nonHaltingErrorMessage = gameConfigObj.nonHaltingErrorMessage;
    this.speedMiliseconds = gameConfigObj.speedMiliseconds;
    this.colorBordes = gameConfigObj.colorBordes? gameConfigObj.colorBordes : "white";
    // this.wallImageUrl = gameConfigObj.wallImageUrl;
    // this.pathImageUrl = gameConfigObj.pathImageUrl

    this.log=[];
    this.showInterface = false;

    this.escenario; // class Escenario
    this.personajes = []; // [class Personaje,]
    
    this.pasoActual = 0; // Contador de pasos "turnos"
    this.pasosPreprogramadosOriginal = []; // [{de: "fulano", pasos:[]}, {}, {}]
    this.pasosPreprogramadosTraducidos = []; // ["abajo","izquierda","derecha"]
    this.movimientosYaValidados = []; // ["abajo","decir_choqué"];
  }
  crearEscenario(elementoHTML,matriz){
    return this._crearEscenario(elementoHTML,matriz);
  }
  _crearEscenario(elementoHTML,matriz) {
    this.escenario = new Escenario(
      matriz,
      elementoHTML,
      this.anchoBaseElementos,
      // this.colorBordes,
    );
    const reglaCasilleros = document.createElement("STYLE");
    reglaCasilleros.innerHTML = `
      .casillero{
        width: ${this.anchoBaseElementos}px;
        height: ${this.anchoBaseElementos}px;
        border: 1px solid ${this.colorBordes};
      }
      .personaje{
        width: ${this.anchoBaseElementos}px;
        height: ${this.anchoBaseElementos}px;
      }
    `
    document.querySelector("head").appendChild(reglaCasilleros)
    return this.escenario;
  }
  agregarPersonaje(classType,configObjPersonajeAgregando) {
    configObjPersonajeAgregando.anchoBase = this.anchoBaseElementos;
    const person = new classType(configObjPersonajeAgregando, this);
    this.personajes.push(person);
    return person
  }
  getPersonaje(nameId) {
    return this.personajes.find((p) => p.nameId == nameId);
  }

  agregarModal(modalPannelObj){
    this.modalPannel = new ModalPannel(modalPannelObj,this);
    return this.modalPannel
  }

  setSpeed(milisegundos){
    this.speedMiliseconds = milisegundos
    for(let pers of this.personajes){
      pers.interfaz.setSpeed(milisegundos)
    }
  }

  terminateAll(){
    for(let pers of this.personajes){
      pers.terminate()
    }
  }

  reiniciar(){
    this.modo="inicio";
    for(let pers of this.personajes){
      pers.initialize()
    }
    if(this.modalPannel){
      this.modalPannel.initialize();
    }
  }
  traducirPasosPreprogramadosOriginal() {
    //cambia los "derecha7" por tres repeticiones de lo mismo.
  }
  recorrerPasosPreprogramadosSoloValidando() {
    // va pusheando al YaValidados
    // return{x:"un objeto con el status de la validacion para el mensaje final"}
  }

  runLog(){
    this.reiniciar()
    this.status="running"
    let speed = this.speedMiliseconds;
    function iterar(lista,posicion=0){
      if(posicion<lista.length){
        let item = lista[posicion];
        // console.log(item)
        item.personaje[item.nombreFuncion](item.details);
        setTimeout(()=>{
          iterar(lista,posicion+1)
        },speed)
      }
    }
    let myLog = [...this.log];
    this.log = [];
    iterar(myLog);
  }

}

class ModalPannel{
  constructor(modalPannelObj, juego){
    this.juego = juego;
    this.startsHidden = modalPannelObj.startsHidden;
    this.initialTitleText = modalPannelObj.title;
    this.initialImageUrl = modalPannelObj.imageUrl;
    this.initialMainText = modalPannelObj.mainText;
    
    this.elementoPannel = document.createElement("DIV");
    this.elementoPannel.classList.add("dhs-modal-pannel");
    
    this.titleElement = document.createElement("P");
    this.titleElement.classList.add("dhs-modal-pannel-title");
    this.imageElement = document.createElement("IMG");
    this.imageElement.classList.add("dhs-modal-pannel-image");
    this.mainTextElement = document.createElement("P");
    this.mainTextElement.classList.add("dhs-modal-pannel-main-text");

    this.elementoPannel.appendChild(this.titleElement);
    this.elementoPannel.appendChild(this.imageElement);
    this.elementoPannel.appendChild(this.mainTextElement);

    this.initialize();
    juego.escenario.elementoHTML.appendChild(this.elementoPannel);
  }
  initialize(){
    if(this.startsHidden){
      this.ocultar();
    } else {
      this.mostrar();
    }
    this.titleElement.innerHTML = this.initialTitleText;
    this.imageElement.src = this.initialImageUrl;
    this.mainTextElement.innerHTML = this.initialMainText;
  }
  mostrar(){
    if(this.juego.modo != "prerun"){
      this.elementoPannel.classList.remove("dhs-modal-pannel-hidden");
    }
  }
  ocultar(){
    this.elementoPannel.classList.add("dhs-modal-pannel-hidden");
  }
}

class Escenario {
  constructor(
    matrizCruda,
    elementoHTML,
    unidadAnchoDeseada,
    colorBordes = "white"
    ) {
      this.matrizCruda = matrizCruda; // Crudo de casilleros a crear
      this.colorBordes = colorBordes;
      this.renderizarLaberinto(elementoHTML, unidadAnchoDeseada);
      this.objetosCasilleros = []; // La matriz de objetos Casilleros
      for (let f=0; f<matrizCruda.length; f++) {
        let newRow = [];
        for (let c=0; c<matrizCruda[f].length; c++) {
          let newCas;
          if (matrizCruda[f][c]==1){
            newCas = new Casillero("wall",f,c,unidadAnchoDeseada,this.colorBordes);
          } else if (matrizCruda[f][c]==0){
            newCas = new Casillero("path",f,c,unidadAnchoDeseada,this.colorBordes);
          } else{
            console.log("ERROR EN CASILLEROS");
          }
          newRow.push(newCas);
          this.elementoHTML.appendChild(newCas.elementoHTML);
        }
      this.objetosCasilleros.push(newRow);
    }
  }
  renderizarLaberinto(elementoHTML, unidadAnchoDeseada) {
    this.unidadAncho = unidadAnchoDeseada;
    this.anchoTotal = this.unidadAncho * this.matrizCruda[0].length;
    this.altoTotal = this.unidadAncho * this.matrizCruda.length;
    this.elementoHTML = elementoHTML;
    this.elementoHTML.style.width = this.anchoTotal + "px";
    this.elementoHTML.style.height = this.altoTotal + "px";
  }

}

class Casillero {
  constructor(type, f, c, unidadAncho,colorBorde) {
    this.elementoHTML = document.createElement("DIV");
    this.elementoHTML.classList.add("casillero");
    this.idElemento = "cas-" + f + "-" + c;
    this.elementoHTML.setAttribute("id", this.idElemento);

    this.occupants = [];
    this.setear(type)
  }
  setear(tipo){
    this.type = tipo;
    this.walkable = tipo=="path";
    this.elementoHTML.setAttribute("class","casillero " + tipo);
  }
}

/**
 * Abstract Class Personaje.
 *
 * @class Personaje
 */
class Personaje {
  constructor(persConfigObj, juego) {
    if (this.constructor == Personaje) {
      // throw new Error("No se debe instanciar la clase abstracta Personaje");
    }
    this.nameId = persConfigObj.idUsarHTML;
    // TIPOS [JUGABLE, FUEGOS, COFRES, MONEDAS, ENTRADA, SALIDA]
    //tipoPersonaje: viende dentro de persConfigObj
    this.persConfigObj = persConfigObj;
    this.alive = true;
    this.vidas = persConfigObj.vidas;
    this.initialVidas = persConfigObj.vidas;
    this.juego = juego;
    this.tipoPersonaje = persConfigObj.tipoPersonaje;
    this.statuses = persConfigObj.statuses;
    this.currentStatus = persConfigObj.currentStatus;
    this.initialStatus = persConfigObj.currentStatus;
    this.initial_y = persConfigObj.initial_y;
    this.initial_x = persConfigObj.initial_x;
    this.collisions = [];
    persConfigObj.juego = this.juego;
    this.interfaz = new INTERFAZ_PERSONAJE(persConfigObj);
    // this.cas_y_actual = persConfigObj.coordenadaY;
    // this.cas_x_actual = persConfigObj.coordenadaX;
    this.initialize();
  }

  initialize(){
    this.alive = true;
    this.callar();
    this.setStatus(this.initialStatus);
    this.actualizarCasillerosJuego(this.initial_y,this.initial_x,true);
    this.interfaz.moverPersonajeHTML(
      this.initial_y*this.juego.anchoBaseElementos,
      this.initial_x*this.juego.anchoBaseElementos
    )
  }

  setStatus(stat){
    this.currentStatus = stat;
    if(this.juego.modo!="prerun"){
      this.interfaz.setImage(this.statuses[stat].imageUrl)
    }
  }

  actualizarCasillerosJuego(nuevaY, nuevaX, isFirstStep = false) {
    if (!isFirstStep) {
      const indice = this.casilleroActual.occupants.indexOf(this);
      if (indice > -1) {
        this.casilleroActual.occupants.splice(indice, 1);
      }
    }
    this.cas_y_actual = nuevaY;
    this.cas_x_actual = nuevaX;
    this.casilleroActual =
      this.juego.escenario.objetosCasilleros[nuevaY][nuevaX];
    this.casilleroActual.occupants.push(this);
  }
  _forceDecir(texto, milisegundos=3000){
    if(this.interfaz.hasTooltips && this.juego.modo != "prerun"){
      this.interfaz.elementoTextoTooltip.innerHTML = texto;
      this.interfaz.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.interfaz.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
  }
  _decir(texto, milisegundos=3000) {
    if(!this.alive){return false}
    else this._forceDecir(texto,milisegundos);
  }

  callar(){
    this.interfaz.elementoHTML.classList.remove("tooltipVisible")
  }
  
  terminate() {
    this.alive = false;
  }

  decir(texto,milisegundos=3000){
    this._decir(texto,milisegundos);
    // Y LOGGEARLO!!
  }
}

class INTERFAZ_PERSONAJE {
  constructor(interfazConfigObj) {
    this.interfazConfigObj = interfazConfigObj;
    this.anchoBase = interfazConfigObj.anchoBase;
    this.imageUrls = interfazConfigObj.imageUrls;
    this.hasTooltips = interfazConfigObj.hasTooltips;
    this.juego = interfazConfigObj.juego;
    if (interfazConfigObj.yaCreadoEnHtml) {
      this.elementoHTML = interfazConfigObj.elementoHTML;
    } else {
      this.elementoHTML = document.createElement("DIV");
      this.elementoHTML.id = interfazConfigObj.idUsarHTML;
      this.juego.escenario.elementoHTML.appendChild(this.elementoHTML)
    }
    
    this.elementoHTML.classList.add("personaje");
    this.elementoHTML.style.zIndex = interfazConfigObj.zindex;
  
    this.setSpeed(this.juego.speedMiliseconds)
    
    if (interfazConfigObj.hasTooltips) {
      this.elementoHTML.classList.add("tooltip");
      this.elementoTextoTooltip = document.createElement("DIV");
      this.elementoTextoTooltip.id = this.elementoHTML.id + "-txtTltp"; // OJO ACA
      this.elementoTextoTooltip.classList.add("tooltiptext");
      this.elementoTextoTooltip.innerText = "...";
      this.elementoHTML.appendChild(this.elementoTextoTooltip);
    }
    
    if (interfazConfigObj.yaConImagenEnHtml) {
      this.imagenAnidada = this.elementoHTML.querySelector("IMG");
    } else {
      this.imagenAnidada = document.createElement("IMG");
      if(this.interfazConfigObj.padding){
        this.imagenAnidada.style.padding = this.interfazConfigObj.padding;
      }
      this.elementoHTML.appendChild(this.imagenAnidada);
    }
  }
  setImage(url){
    this.imagenAnidada.setAttribute("src", url)
  }
  setSpeed(milisegundos){
    this.elementoHTML.style.transition="all " + milisegundos/1000 + "s"
  }
  moverPersonajeHTML(posY, posX){
    if(this.juego.modo != "prerun"){
      // console.log("MOVIENDO")
      this.elementoHTML.style.left = posX + "px";
      this.elementoHTML.style.top = posY + "px";
    }
  }
}

/**
 * PersonajeMovible.
 *
 * @class PersonajeMovible
 * @extends {Personaje}
 */

class PersonajeMovible extends Personaje{
  constructor(persConfigObj, juego){
    super(persConfigObj, juego);
  }
  chequearValidezMovimiento(nuevaY, nuevaX) {
    // Chequea tanto por ""existencia"" como por walkability
    const existe =       
      nuevaY >= 0 &&
      nuevaX >= 0 &&
      nuevaY < this.juego.escenario.objetosCasilleros.length &&
      nuevaX < this.juego.escenario.objetosCasilleros[nuevaY].length;
    // const casilleroObservado = this.juego.escenario.objetosCasilleros[nuevaY][nuevaX];
    const isWalkable = existe &&  this.juego.escenario.objetosCasilleros[nuevaY][nuevaX].walkable;
    let advanceFactor;
    let mensaje = null;
    let continua;
    let shouldUpdateCasilleros = false;
    if(!existe){
      advanceFactor = this.juego.errorsHalt? 0.35 : 0;
      mensaje = this.juego.errorsHalt? this.juego.boundsCollideMessage : this.juego.nonHaltingErrorMessage;
      continua = !this.juego.errorsHalt;
    } else if (!isWalkable) {
      advanceFactor = this.juego.errorsHalt? 0.45 : 0;
      mensaje = this.juego.errorsHalt? this.juego.wallCollideMessage : this.juego.nonHaltingErrorMessage;
      continua = !this.juego.errorsHalt;
    } else {
      advanceFactor = 1
      continua = true;
      shouldUpdateCasilleros = true;
    }
    return {
      existe,
      isWalkable,
      advanceFactor,
      mensaje,
      continua,
      shouldUpdateCasilleros
    };
  }
  
  detectarColisiones(){
    const casilleroObservado = this.casilleroActual;
    let colision;
    for(let ocupante of casilleroObservado.occupants){
      // console.log(ocupante.tipoPersonaje);
      colision = this.collisions.find(c=>c.with==ocupante.tipoPersonaje);
      if (colision){
        colision.ocupanteAfectado = ocupante;
        break
      }
    }
    return colision;
  }
  
  _realizarMovimiento(params){
    // params={y:0, x:+1,details}
    if(!this.alive){return false}

    const cas_y_original = this.cas_y_actual 
    const cas_x_original = this.cas_x_actual;
    const cas_y_nuevo = cas_y_original + params.y;
    const cas_x_nuevo = cas_x_original + params.x;
    const chequeo = this.chequearValidezMovimiento(cas_y_nuevo, cas_x_nuevo);
    let avanceY = params.y * chequeo.advanceFactor * this.juego.anchoBaseElementos;
    let avanceX = params.x * chequeo.advanceFactor * this.juego.anchoBaseElementos;
    let continua = chequeo.continua;
    if(!chequeo.continua){this.terminate()}
    if(chequeo.mensaje){
      this._forceDecir(chequeo.mensaje,3000);
    }
    if(chequeo.shouldUpdateCasilleros){
      this.actualizarCasillerosJuego(cas_y_nuevo, cas_x_nuevo);
    }
    // INTERACCIONES
    const colision = this.detectarColisiones();
    if(colision){
      avanceY = params.y * chequeo.advanceFactor * colision.advanceFactor * this.juego.anchoBaseElementos;
      avanceX = params.x * chequeo.advanceFactor * colision.advanceFactor * this.juego.anchoBaseElementos;
      if(colision.selfMessage){
        this._decir(colision.selfMessage,20000)
      }
      if(colision.selfHandler){
        this[colision.selfHandler]()
      }
      if(colision.thirdPartyMessage){
        colision.ocupanteAfectado._decir(colision.thirdPartyMessage)
      }
      if(colision.thirdPartyHandler){
        colision.ocupanteAfectado[colision.thirdPartyHandler]()
      }
      if(colision.shouldHalt){
        continua = false;
        this.terminate();
      } else {
        continua = true;
      }
    }
    const nuevaXPos = cas_x_original*this.juego.anchoBaseElementos + avanceX;
    const nuevaYPos = cas_y_original*this.juego.anchoBaseElementos + avanceY;
    this.interfaz.moverPersonajeHTML(nuevaYPos, nuevaXPos);
    const log = {
      personaje: this,
      continua: continua,
      isVictory: colision ? colision.isVictory : false,
      mensajeValidez: chequeo.mensaje,
      mensajeColisionSelf: colision ? colision.selfMessage : null,
      mensajeColisionThird: colision ? colision.thirdPartyMessage : null,
      details: params.details,
      nombreFuncion: params.nombreFuncion
    }
    // console.log(log)
    if(this.juego.modo == "prerun"){
      this.juego.log.push(log);
    } else if(this.juego.showInterface){
      this.juego.showInterface.show(log)
    }
    return log;
  }
  addCollision(collisionObj){
    this.collisions.push(collisionObj)
  }
}

/**
 * PersonajeMovibleAbsoluto.
 *
 * @class PersonajeMovibleAbsoluto
 * @extends {PersonajeMovible}
 */
class PersonajeMovibleAbsoluto extends PersonajeMovible{
  constructor(persConfigObj, juego){
    super(persConfigObj, juego);
  }

  moverDerecha(details={origin:"unknown"}){
    const ejecucion = this._realizarMovimiento({y:0,x:+1,details,nombreFuncion:"moverDerecha"})
    return ejecucion
  }
  moverIzquierda(details={origin:"unknown"}){
    const ejecucion = this._realizarMovimiento({y:0,x:-1,details,nombreFuncion:"moverIzquierda"})
    return ejecucion
  }
  moverAbajo(details={origin:"unknown"}){
    const ejecucion = this._realizarMovimiento({y:+1,x:0,details,nombreFuncion:"moverAbajo"})
    return ejecucion
  }
  moverArriba(details={origin:"unknown"}){
    const ejecucion = this._realizarMovimiento({y:-1,x:0,details,nombreFuncion:"moverArriba"})
    return ejecucion
  }
}

/**
 * RobotStandard.
 *
 * @class RobotStandard
 * @extends {PersonajeMovibleAbsoluto}
 */
class RobotStandard extends PersonajeMovibleAbsoluto{
  constructor(shortConfigObj, juego){
    let x =     {
      tipoPersonaje: "JUGABLE",
      yaCreadoEnHtml: false,
      elementoHTML: null,
      yaConImagenEnHtml: false,
      imagenenHTML: null,
      hasTooltips: true,
      zindex:3,
    }
    let merged = {...x, ...shortConfigObj}
    super(merged, juego);
  }
}

/**
 * Openable.
 *
 * @class Openable
 * @extends {Personaje}
 */
 class Openable extends Personaje{
  constructor(persConfigObj, juego){
    super(persConfigObj, juego);
  }
  open(){
    this.setStatus("open");
  }
  open_and_show_modal(){
    this.open();
    this.juego.modalPannel.mostrar();
  }
  open_and_end(){
    this.open_and_show_modal();
    this.juego.terminateAll()
  }
  close(){
    this.setStatus("closed");
    this.juego.modalPannel.ocultar();
  }
}


/**
 * PersonajeObjetoSimple.
 *
 * @class PersonajeObjetoSimple
 * @extends {Personaje}
 */
class PersonajeObjetoSimple extends Personaje{
  constructor(persConfigObj, juego){
    super(persConfigObj, juego);
  }
}
