/**
 * Lupe.
 *
 * @class Lupe
 * @extends {RobotStandard}
 */
class Lupe extends RobotStandard{
    constructor(verShortObj,juego){
        verShortObj.idUsarHTML="lupe";
        super(verShortObj, juego);
        this.addCollision({
            with:"LODO", 
            advanceFactor: 0.7, 
            shouldHalt:true, 
            selfHandler: "terminate", 
            selfMessage:"¡OH NO! Me atasqué en el lodo.",
            thirdPartyHandler:null,
            thirdPartyMessage:null,
        });
    }
    abrirCofre = function(details){
        if(!this.alive){return false}
        const cofre = this.casilleroActual.occupants.find(occ=>occ.tipoPersonaje=="COFRE");
        const mensajeValidez = cofre? null : "¡ERROR! Aquí no hay un cofre";
        if(cofre){
            cofre.abrir();
        } else {
            this.terminate();
            this._decir(mensajeValidez);
        }
        const log = {
            personaje: this,
            continua: cofre!=undefined,
            mensajeValidez,
            nombreFuncion: "abrirCofre",
            details
        }
        if(this.juego.modo == "prerun"){
            this.juego.log.push(log);
        } else if(this.juego.showInterface){
            this.juego.showInterface.show(log)
        }
        return log;
    }

}

/**
 * Cofre.
 *
 * @class Cofre
 * @extends {Openable}
 */

class Cofre extends Openable{
    constructor(configObj,juego){
        super(configObj,juego)
        this.abrir = this.open_and_end;
        this.cerrar = this.close;
    }
}