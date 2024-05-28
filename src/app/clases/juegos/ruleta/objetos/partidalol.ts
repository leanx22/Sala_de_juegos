import { JuegoComponent as Juego} from "../../../../componentes/interactivos/juegos/RuletaRusa/juego/juego.component";
import { Objeto } from "../objeto";
import { LoggerService } from "../../../../servicios/juegos/Ruleta/logger.service";
import { Inject } from "@angular/core";

export class Partidalol extends Objeto {
    private contextoPartida: Juego;

    constructor(contexto: Juego, logger: LoggerService) {
        super("obj_lol", logger);
        this.contextoPartida = contexto;
    }

    public override usar(){
        if(super.fueUsado)
        {
                return;
        }
        super.usar();
        this.contextoPartida.danoArma = 2;
        this.contextoPartida.audioLoL.play();
        this.logger.addLog("Oh oh... Alguien se jugó una partida de lol... y no está de buen humor! (daño duplicado sólo para el siguiente disparo)");
    }
}

