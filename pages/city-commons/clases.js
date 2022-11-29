/**
 * PersonajeCity.
 *
 * @class PersonajeCity
 * @extends {RobotStandard}
 */
class PersonajeCity extends RobotStandard{
    constructor(verShortObj,juego){
        verShortObj.idUsarHTML="personaje-city";
        super(verShortObj, juego);
        this.addCollision({
            with:"BARRERA", 
            advanceFactor: 0.3, 
            shouldHalt:true, 
            selfHandler: "terminate", 
            selfMessage:"¡OH NO! La calle está cortada.",
            thirdPartyHandler:null,
            thirdPartyMessage:null,
        });
        this.addCollision({
            with:"AUTO-EMBOTELLADO", 
            advanceFactor: 0.3, 
            shouldHalt:true, 
            selfHandler: "terminate", 
            selfMessage:"¡OH NO! Demasiado tráfico por aquí.",
            thirdPartyHandler:null,
            thirdPartyMessage:null,
        });
        this.addCollision({
            with:"ARBOL", 
            advanceFactor: 0.5, 
            shouldHalt: true, 
            selfHandler: "terminate", 
            selfMessage:"¡OH NO! Choqué contra un árbol.",
            thirdPartyHandler:null,
            thirdPartyMessage:null,
        });
        this.addCollision({
            with:"PASTO", 
            advanceFactor: 1, 
            shouldHalt: false, 
            selfHandler: "_celebrarAndarPorParque", 
            selfMessage: null,
            thirdPartyHandler:null,
            thirdPartyMessage:null,
        });
        this.addCollision({
            with:"DESTINO", 
            advanceFactor: 1, 
            shouldHalt: true,
            isVictory: true, 
            selfHandler: "_llegar", 
            selfMessage: null,
            thirdPartyHandler:null,
            thirdPartyMessage:null,
        });
    }
    _celebrarAndarPorParque(){
        this._decir("¡Me gusta ir por el parque!",this.juego.speedMiliseconds);
    }
    _llegar(){
        this._decir("¡Llegamos!",20000);
        this.juego.modalPannel.mostrar()
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