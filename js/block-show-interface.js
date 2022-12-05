/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
class BlockShowInterface{
    constructor(game){
        this.name="Block Show Interface";
        // this.juego = game;
    }
    marcarIncorrecto(elemento){
        elemento.classList.remove("dhs-running-block-correct");
        elemento.classList.remove("dhs-running-block-past");
        elemento.classList.add("dhs-running-block-incorrect");
    }
    marcarPasado(elemento){
        elemento.classList.remove("dhs-running-block-correct");
        elemento.classList.remove("dhs-running-block-incorrect");   
        elemento.classList.add("dhs-running-block-past");
    }
    marcarCorrecto(elemento){
        elemento.classList.remove("dhs-running-block-incorrect");   
        elemento.classList.remove("dhs-running-block-past");
        elemento.classList.add("dhs-running-block-correct");
    }
    desmarcar(elemento){
        elemento.classList.remove("dhs-running-block-incorrect");   
        elemento.classList.remove("dhs-running-block-past");
        elemento.classList.remove("dhs-running-block-correct");     
    }
    // OBLIGATORIO (polimorfismo)
    desmarcarTodos(){
        for(let bloque of document.getElementById("dhs-lista2").children){
            this.desmarcar(bloque);
        }
    }
    // OBLIGATORIO (polimorfismo)
    show(x){
        let instruccionActual = x.details.instructionCount;
        let listaInstrucciones = document.getElementById("dhs-lista2");
        let itemsInstrucciones = listaInstrucciones.children;
        if(itemsInstrucciones.length>instruccionActual){
            // console.log(instruccionActual)
            let itemActual = itemsInstrucciones[instruccionActual];
            if(instruccionActual>0){
                let itemAnterior = itemsInstrucciones[instruccionActual-1]
                this.marcarPasado(itemAnterior);
            }
            if(x.continua || x.isVictory){
                this.marcarCorrecto(itemActual)
            }else{
                this.marcarIncorrecto(itemActual)
            }
        }
    }
}