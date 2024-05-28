import { Jugador } from "../jugador";
import { Objeto } from "../objeto";
import { LoggerService } from "../../../../servicios/juegos/Ruleta/logger.service";
import { JuegoComponent as Juego} from "../../../../componentes/interactivos/juegos/RuletaRusa/juego/juego.component";

export class Adermicina extends Objeto {
    private contextoJugador: Jugador;
    private contextoPartida: Juego

    constructor(player: Jugador, logger: LoggerService, contexto: Juego) {        
        super("obj_adermicina", logger);
        this.contextoJugador = player;
        this.contextoPartida = contexto;
    }

    public override usar(){
        if(super.fueUsado)
        {
            return;
        }
        super.usar();
        
        if(this.contextoPartida.esMuerteSubita)
        {
            this.logger.addLog("La Adermicina está vencida...","Partida");
            return;
        }

        this.contextoJugador.aumentarVidas();
        if(this.contextoJugador.obtenerNombre === "Humano"){
            this.logger.addLog("Un poquito de adermicina y estas 0km! (+1 vida)","Partida");
        }
        this.contextoPartida.audioAdermicina.play();
        
    }
}
