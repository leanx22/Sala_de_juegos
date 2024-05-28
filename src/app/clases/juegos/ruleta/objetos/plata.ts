import { JuegoComponent as Juego} from "../../../../componentes/interactivos/juegos/RuletaRusa/juego/juego.component";
import { Objeto } from "../objeto";
import { LoggerService } from "../../../../servicios/juegos/Ruleta/logger.service";


export class Plata extends Objeto {
    private contextoPartida: Juego;    


    constructor(contexto: Juego, logger: LoggerService) {
        super("obj_plata", logger);
        this.contextoPartida = contexto;
    }

    public override usar(){
        if(super.fueUsado)
        {
            return;
        }
        
        super.usar();
        this.contextoPartida.audioPlata.play();
        if(this.contextoPartida.obtenerDataArma.cartucho[this.contextoPartida.obtenerDataArma.cartucho.length - 1] == 1)
        {
            this.logger.addLog("Le pagás al arbitro. Ahora sabes que la siguiente bala es LETAL", "Partida");
        }
        else{
            this.logger.addLog("Le pagás al arbitro. Ahora sabes que la siguiente bala es PLACEBO", "Partida");            
        }        
    }
}
