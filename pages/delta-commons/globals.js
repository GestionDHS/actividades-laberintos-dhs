/*
Desarrollado por Digital House Schools para su uso exlusivo en el marco de cursos del Digital Skills Diploma y Plataforma Playground (by Digital House).
https://www.digitalhouse.com/ar/productos/escuelas
*/
function avanzar(veces = 1){
    miActividad.instructionCount++;
    for(let i = 0; i<veces; i++){
        miActividad.stepCount++;
        miPersonaje.avanzar({
            arguments,
            origin:"student_code",
            instructionCount: miActividad.instructionCount,
            stepCount: miActividad.stepCount
        });
    }
}

function girar(gr = 90){
    miActividad.instructionCount++;
    miActividad.stepCount++;
    miPersonaje.girarGrados({
        arguments,
        origin:"student_code",
        instructionCount: miActividad.instructionCount,
        stepCount: miActividad.stepCount
    });
}

function girarIzquierda(x){
    miActividad.instructionCount++;
    miActividad.stepCount++;
    miPersonaje.girarIzquierda({
        arguments,
        origin:"student_code",
        instructionCount: miActividad.instructionCount,
        stepCount: miActividad.stepCount
    });
}
function girarDerecha(x){
    miActividad.instructionCount++;
    miActividad.stepCount++;
    miPersonaje.girarDerecha({
        arguments,
        origin:"student_code",
        instructionCount: miActividad.instructionCount,
        stepCount: miActividad.stepCount
    });
}

function apuntar(dire){
    miActividad.instructionCount++;
    miActividad.stepCount++;
    miPersonaje.apuntarEnDireccion({
        arguments,
        origin:"student_code",
        instructionCount: miActividad.instructionCount,
        stepCount: miActividad.stepCount
    })
}

function juntar(x){
    miActividad.instructionCount++;
    miActividad.stepCount++;
    miPersonaje.juntar({
        origin:"student_code",
        instructionCount: miActividad.instructionCount,
        stepCount: miActividad.stepCount
    });
}

miActividad.interface.handleInstructions = function(bl){
    let val = bl.valorPrincipal;
    switch(val){
      case "avanzar":
        avanzar(...bl.valorParametro);
        break;
      case "girarIzquierda":
        girarIzquierda(...bl.valorParametro);
        break;
      case "girarDerecha":
        girarDerecha(...bl.valorParametro);
        break;
      case "apuntar":
        apuntar(...bl.valorParametro);
        break;
      case "girar":
        girar(...bl.valorParametro);
        break;
      case "juntar":
            juntar(...bl.valorParametro);
            break;
      default:
        console.log("INVALIDO");
    }
}