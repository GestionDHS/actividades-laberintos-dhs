/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/

/*--------------------Sortable--sendOrders()---BTN-erase()----------- */
class Sortable_Blocks{
  constructor(sortableBlocksConfigObj){

    this.lista = document.getElementById(sortableBlocksConfigObj.idListaOrigen);
    this.lista2 = document.getElementById(sortableBlocksConfigObj.idListaDestino);
    this.listaErase = document.getElementById(sortableBlocksConfigObj.idListaErase)
    this.botonErase = document.getElementById(sortableBlocksConfigObj.idBotonErase);
    this.editable = sortableBlocksConfigObj.editable;
    this.edicionHabilitable = sortableBlocksConfigObj.edicionHabilitable;
    this.availableBlocksList = []; // Para clonarlos en B si hay preseteados.

    this.sortable = new Sortable(this.lista, {
      group: {
        name: "shared",
        pull: "clone",
        put: false,
      },
      sort: false,
      animation: 500,
    });
    this.sortable2 = new Sortable(this.lista2, {
      group: {
        name: "shared",
        pull: true,
      },
      sort: true,
      animation: 400,
      easing: "cubic-bezier(1, 0, 0, 1)"
    });
    // Sortable.create(this.lista2, {
    //   group: {
    //     name: "erased",
    //     pull: true,
    //   },
    //   sort: false,
    //   animation: 550,
    // });
    this.erased = Sortable.create(this.listaErase, {
      group: {
        name: "erased",
        pull: false,
        put: true,
      },
      animation: 550,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
    });
    if (this.editable){
      this.habilitarEdicion();
    } else {
      this.deshabilitarEdicion();
    }
  }
  async erase() {
    const confirmacion = await Swal.fire({
      title: 'Con este botón podrás borrar todas las instrucciones ya programadas.',
      text: '¿Deseas eliminarlas?',
      icon: 'warning',
      confirmButtonText: '¡Sí, eliminar!',
      showCancelButton: true,
      cancelButtonText:"¡No, cancelar!",
      color: 'white',
      background:"gray",
      confirmButtonColor:"#007a4c",
      cancelButtonColor:"#cc5a47"
    })
    if(confirmacion.isConfirmed){
      let elem = document.querySelector("#dhs-lista2");
      elem.innerHTML = "";
    }
  }
  agregarBloqueListaA(pars){
    const miBlock = this.crearBloque(pars);
    this.availableBlocksList.push(miBlock);
    this.lista.appendChild(miBlock);
  }
  agregarBloqueListaB(pars){
    const miBlock = this.crearBloque(pars);
    this.lista2.appendChild(miBlock);
  }
  agregarBloquePreseteadoSegunClave(clave){
    const elemToClone = this.availableBlocksList.find(bl=>clave==bl.getAttribute("data-id"));
    this.lista2.appendChild(elemToClone.cloneNode(true));
  }
  crearBloque(params){
    const blockListItem = document.createElement("li");
    blockListItem.setAttribute("data-id",params.clave);
    const icon = document.createElement("IMG");
    icon.alt = params.nombreCompleto;
    icon.src = params.rutaImagen;
    const caja = document.createElement("DIV");
    const txt = document.createElement("SPAN");
    txt.innerHTML = params.nombreCompleto;
    caja.appendChild(txt);
    blockListItem.appendChild(icon);
    blockListItem.appendChild(caja);
    if(params.inputElements){
      for(let inpt of params.inputElements){
        caja.appendChild(inpt);
      }
    }
    return blockListItem;
  }
  // Obligatoria
  alimentarLog(){
    const bloques = this.sendOrders();
    if(bloques){
      for (let bl of bloques){
        // console.log(bl)
        this.handleInstructions(bl);
      }
    }
  }
  // Obligatoria
  habilitarEdicion(){
    if(this.edicionHabilitable){
      this.habilitarErase()
      this.habilitarSort();
    }
  }
  // Obligatoria
  deshabilitarEdicion(){
    this.deshabilitarErase();
    this.deshabilitarSort();
  }
  habilitarSort(){
    this.sortable.option("disabled", false);
    this.sortable2.option("disabled", false);
  }
  deshabilitarSort(){
    this.sortable.option("disabled", true);
    this.sortable2.option("disabled", true);
  }
  habilitarErase(){
    this.botonErase.addEventListener("click",this.erase);
    this.erased.option("disabled", false);
  }
  deshabilitarErase(){
    this.botonErase.removeEventListener("click",this.erase);
    this.erased.option("disabled", true);
  }
  
  sendOrders() {
    const lista = this.lista2.querySelectorAll("li");
    const bloques = [];
    if(lista.length>0){
      for(let item of lista){
        let parms = [];
        let elementosInput = item.querySelectorAll("li, select");
        for(let elIn of elementosInput){
          parms.push(elIn.value);
        }
        bloques.push({
          name: item.getAttribute("data-id"),
          valorParametro: parms,
        });
      }
    } else {
      Swal.fire({
        title: 'No hay ninguna instrucción para ejecutar.',
        text: '¿Continuamos?',
        icon: 'warning',
        confirmButtonText: 'Ok',
        color: 'white',
        background:"gray",
        confirmButtonColor:"#007a4c"
      })
    }
    return this.ordersToObjects(bloques);
  }

  ordersToObjects(arrOfOrders){
    // const { nombre, personajes } = miJuego//sacar
    const pasosDelAlumno = []
    const de = "lupe";
    if(arrOfOrders){
        arrOfOrders.forEach((order, index)=>{
            const ord = {
                de, // por defecto, en este juego, siempre será para Lupe.
                numeroDeBloque: index, // el numero de bloque leido (orden)
                valorPrincipal: order.name, // o abajo, derecha, etc. (string)
                valorParametro: order.valorParametro // para cuando tengamos bloques como "mover 10/20/30 pasos". En nuestro caso, no hay nada.  como en scratch pasa [tiempo,texto]     
            }
            pasosDelAlumno.push(ord)
        })
    }else{
        return null
    }
    return pasosDelAlumno
  }

}
