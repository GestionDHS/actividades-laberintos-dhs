/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
class DHS_Game_Act{
  constructor(idBotonEjecutar){
    this.botonEjecutar = document.getElementById(idBotonEjecutar);
    this.habilitarEjecucion();
    this.instructionCount = -1;
    this.stepCount = -1;
  }
  inicializar(){
    this.juego = new Juego(this.configuracionJuego);
    this.juego.showInterface = new BlockShowInterface(this.juego);
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

class Juego {
  constructor(gameConfigObj) {
    this.anchoBaseElementos = gameConfigObj.anchoBaseElementos;
    this.errorsHalt = gameConfigObj.errorsHalt;
    this.nombre = gameConfigObj.nombre; 
    this._matrizCruda = gameConfigObj.matrizCruda;
    this.showMovimientos = gameConfigObj.showMov;
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
      this.colorBordes,
    );
    return this.escenario;
  }
  agregarPersonaje(configObjPersonajeAgregando) {
    configObjPersonajeAgregando.anchoBase = this.anchoBaseElementos;
    const person = new Personaje(configObjPersonajeAgregando, this);
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
    this.elementoHTML.style.height = unidadAncho + "px";
    this.elementoHTML.style.width = unidadAncho + "px";
    this.elementoHTML.style.border = "1px solid " + colorBorde;
    this.occupants = [];
    this.setear(type)
  }
  setear(tipo){
    this.type = tipo;
    this.walkable = tipo=="path";
    this.elementoHTML.setAttribute("class","casillero " + tipo);
  }
}

class Personaje {
  constructor(persConfigObj, juego) {
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
    if(chequeo.mensaje){this._decir(chequeo.mensaje,3000);}
    if(chequeo.shouldUpdateCasilleros){
      this.actualizarCasillerosJuego(cas_y_nuevo, cas_x_nuevo);
    }
    // INTERACCIONES
    const colision = this.detectarColisiones();
    if(colision){
      avanceY = params.y * colision.advanceFactor * this.juego.anchoBaseElementos;
      avanceX = params.x * colision.advanceFactor * this.juego.anchoBaseElementos;
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
  
  _decir(texto, milisegundos=3000) {
    if(this.interfaz.hasTooltips && this.juego.modo != "prerun"){
      this.interfaz.elementoTextoTooltip.innerHTML = texto;
      this.interfaz.elementoHTML.classList.add("tooltipVisible");
      setTimeout(() => {
        this.interfaz.elementoHTML.classList.remove("tooltipVisible");
      }, milisegundos);
    }
  }

  callar(){
    this.interfaz.elementoHTML.classList.remove("tooltipVisible")
  }
  
  terminate() {
    this.alive = false;
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
    
    // ANCHOS
    this.elementoHTML.style.width = this.anchoBase + "px";
    this.elementoHTML.style.height = this.anchoBase + "px";
    // this.elementoHTML.backgroundColor = interfazConfigObj.colorFondo;
    this.elementoHTML.style.top = interfazConfigObj.coordenadaY * this.anchoBase + "px";
    this.elementoHTML.style.left =
    interfazConfigObj.coordenadaX * this.anchoBase + "px";
    this.elementoHTML.style.borderRadius = "5px";
    // this.elementoHTML.style.transition = "all 0.5s";
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
      // this.imagenAnidada.src = this.imageUrls[0]; //FOTO!
      this.imagenAnidada.style.width = "100%";
      this.imagenAnidada.style.height = "100%";
      this.imagenAnidada.style.boxSizing = "border-box";
      this.imagenAnidada.style.padding = "2px";
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

