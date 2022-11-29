/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
function moverDerecha(veces = 1){
    miActividad.instructionCount++;
    for(let i = 0; i<veces; i++){
        miActividad.stepCount++;
        miLupe.moverDerecha({
            arguments,
            origin:"student_code",
            instructionCount: miActividad.instructionCount,
            stepCount: miActividad.stepCount
        });
    }
}

function moverAbajo(veces = 1){
    miActividad.instructionCount++;
    for(let i = 0; i<veces; i++){
        miActividad.stepCount++;
        miLupe.moverAbajo({
            arguments,
            origin:"student_code",
            instructionCount: miActividad.instructionCount,
            stepCount: miActividad.stepCount
        });
    }
}

function moverIzquierda(veces = 1){
    miActividad.instructionCount++;
    for(let i = 0; i<veces; i++){
        miActividad.stepCount++;
        miLupe.moverIzquierda({
            arguments,
            origin:"student_code",
            instructionCount: miActividad.instructionCount,
            stepCount: miActividad.stepCount
        });
    }
}

function moverArriba(veces = 1){
    miActividad.instructionCount++;
    for(let i = 0; i<veces; i++){
        miActividad.stepCount++;
        miLupe.moverArriba({
            arguments,
            origin:"student_code",
            instructionCount: miActividad.instructionCount,
            stepCount: miActividad.stepCount
        });
    }
}

function abrir(x){
    miActividad.instructionCount++;
    miActividad.stepCount++;
    miLupe.abrirCofre({
        origin:"student_code",
        instructionCount: miActividad.instructionCount,
        stepCount: miActividad.stepCount
    });
}

miActividad.interface.handleInstructions = function(bl){
    let val = bl.valorPrincipal;
    switch(val){
      case "arriba":
        moverArriba(...bl.valorParametro);
        break;
      case "abajo":
        moverAbajo(...bl.valorParametro);
        break;
      case "izquierda":
        moverIzquierda(...bl.valorParametro);
        break;
      case "derecha":
        moverDerecha(...bl.valorParametro);
        break;
      case "abrir":
        abrir(...bl.valorParametro);
        break;
      default:
        console.log("INVALIDO");
    }
}