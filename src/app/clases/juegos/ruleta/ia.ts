import { IObjeto } from "../../../../assets/utilidades/ruleta";
import { JuegoComponent } from "../../../componentes/interactivos/juegos/RuletaRusa/juego/juego.component";
import { Jugador } from "./jugador";
import { Objeto } from "./objeto";
import { Adermicina } from "./objetos/adermicina";
import { LoggerService } from "../../../servicios/juegos/Ruleta/logger.service";
import { inject } from "@angular/core";

export class IA extends Jugador {
    private context: JuegoComponent;
    private itemsQueue: Objeto[];
    private logger: LoggerService;

    constructor(nombre :string,gameContext: JuegoComponent,logger: LoggerService,vidas:number=5, inventario?: Objeto[]){
        super(nombre, vidas, inventario);
        this.itemsQueue = [];
        this.context = gameContext;
        this.logger = logger;
    }
    public async startTurn() //No estoy orgulloso de tantos if/else, pero no es mi culpa que typescript no tenga eventos como C#, dios mio.
    {
        await this.simularEspera(2500);
        this.logger.addLog("Me toca...", "Enemigo");
        await this.simularEspera(3500);
        
        let pMorir = this.probabilidadDeMorir();

        //Por defecto siempre se intenta curar
        if(super.obtenerVidas<=2){
            await this.curarse();
        }
        else if(super.obtenerVidas<5){
            await this.curarse();
        }

        if(pMorir>=45){
            if(this.tieneItem("obj_guita")){
                this.obtenerInventario[this.obtenerIndiceItemByID("obj_plata")].marcarComoUsado;
                await this.simularEspera(2000);
                this.logger.addLog("Hmmm veamos...", "Enemigo");
                await this.simularEspera(1500);
                this.context.audioPlata.play();
                this.logger.addLog("El enemigo le pagó al arbitro para que le diga si el siguiente disparo es letal o no!", "Partida");
                if(this.context.obtenerDataArma.cartucho[this.context.obtenerDataArma.cartucho.length - 1] == 1)
                    {
                        pMorir = 101;
                    }
                    else{
                        pMorir = 0;
                    }         
            }
        }

        //Si está inseguro, intenta ver si la bala es real o no
        if(pMorir >= 45 && pMorir <= 55){            
            if(this.obtenerBoolRandom()){  //Si la probabilidad es 50/50 puede que se dispare como que dispare al jugador por igual.
                await this.simularEspera(1000);
                this.logger.addLog("...", "Enemigo");
                await this.simularEspera(2000);
                this.logger.addLog("El enemigo se dispara a él mísmo...", "Partida");
                this.context.shot(false);
                return;
            }
            else{
                await this.simularEspera(1000);
                this.logger.addLog("Yo cerraría los ojos...", "Enemigo");
                await this.simularEspera(2000);
                this.logger.addLog("El enemigo te está apuntando...", "Partida");
                await this.simularEspera(2500);                
                this.context.shot();
                return;
            }
        }

        
        //Si hay mas probabilidades de morir, le dispara al jugador
        if(pMorir > 55){

            if(pMorir > 60 && this.tieneItem("obj_lol")){
                await this.simularEspera(1000);
                this.logger.addLog("Ahora vas a ver...", "Enemigo");
                super.utilizarObjeto(this.obtenerIndiceItemByID("obj_lol"));
                await this.simularEspera(1000);
                this.logger.addLog("El enemigo se jugó una partida de lol y ahora está re caliente...", "Partida");
                await this.simularEspera(2500);                
            }
            
            await this.simularEspera(2000);
            this.logger.addLog("Espero que te duela...", "Enemigo");
            await this.simularEspera(2000);
            this.logger.addLog("Te están apuntando...", "Partida");
            await this.simularEspera(2500);
            this.context.shot();
            return;

        }

        //Si hay menos probabilidades de morir, pero no tantas, decide al azar.
        if(pMorir < 45){
            if(pMorir < 30){
                await this.simularEspera(1500);
                this.logger.addLog("Creo que las probabilidades son bastante bajas...", "Enemigo");
                await this.simularEspera(2500);
                this.logger.addLog("El enemigo se está apuntando...", "Partida");
                await this.simularEspera(3500);                
                this.context.shot(false);
                return;
            }

            if(this.probabilidadDeMorir() < 35){
                await this.simularEspera(1500);
                this.logger.addLog("hmmmm...", "Enemigo");
                await this.simularEspera(2500);
                if(this.obtenerPorcentajeRandom()>35){
                    this.logger.addLog("El enemigo se va a disparar...", "Partida");
                    await this.simularEspera(3500); 
                    this.context.shot(false);
                }else{
                    this.logger.addLog("El enemigo te está apuntando...", "Partida");
                    await this.simularEspera(3500); 
                    this.context.shot();
                }
                
                return;
            }

            if(this.obtenerBoolRandom()){
                await this.simularEspera(1500);
                this.logger.addLog("Esto no es nada...", "Enemigo");
                await this.simularEspera(2500);
                this.logger.addLog("El enemigo se está apuntando...", "Partida");
                await this.simularEspera(3500);  
                this.context.shot(false);
                return;
            }
            else{
                await this.simularEspera(1500);
                this.logger.addLog("Yo cerraría los ojos...", "Enemigo");
                await this.simularEspera(3500);
                this.logger.addLog("El enemigo te está apuntando...", "Partida");
                await this.simularEspera(3500); 
                this.context.shot();
                return;
            }
        }
        
        return;
    }
    
    private async curarse()
    {
        if(super.obtenerInventario.length <= 0 || this.context.esMuerteSubita){            
            return;
        }

        for(let i:number = 0; i<super.obtenerInventario.length; i++){                        
            if(super.obtenerInventario[i] == undefined || super.obtenerInventario[i] == null) break;
            if(super.obtenerInventario[i].id==="obj_adermicina" && !super.obtenerInventario[i].fueUsado){
                super.utilizarObjeto(i);
                this.context.runItemCleaner(this);                
                await this.simularEspera(2000);
                this.logger.addLog("Un poquito de adermicina y estoy como nuevo...", "Enemigo");
                await this.simularEspera(2500);
                this.logger.addLog("El rival usó su objeto y se curó con un poquito de ADERMICINA!", "Partida");
                await this.simularEspera(3000);
            }                       
        }
        return;        
    }

    private tieneItem(id:string):boolean{        

        for(let i:number = 0; i<super.obtenerInventario.length; i++){
            if(super.obtenerInventario[i] == undefined || super.obtenerInventario[i] == null) break;
            if(super.obtenerInventario[i].id===id && !super.obtenerInventario[i].fueUsado){
                return true;
            }
        }
        return false;
    }

    private probabilidadDeMorir():number{
        let cEspacios = this.context.obtenerBalasTotalesRestantes;
        let cBalas = this.context.obtenerBalasRealesFaltantes;
        let probabilidad = (cBalas / cEspacios) * 100;
        probabilidad = Math.floor(probabilidad);
        console.log("Probabilidad de muerte calculada por la IA: "+probabilidad)+" %";
        return probabilidad;
    }

    private obtenerBoolRandom(): boolean{
        let num = Math.floor(Math.random() * 101);
        if(num>=50){
            return true;
        }else{
            return false;
        }        
    }

    private obtenerPorcentajeRandom(): number{
        return Math.floor(Math.random() * 101);       
    }

    private obtenerIndiceItemByID(id:string): number{
        for(let i:number = 0; i<super.obtenerInventario.length; i++){
            if(super.obtenerInventario[i].id===id){
                return i;
            }
        }
        return -1;
    }

    public simularEspera(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
