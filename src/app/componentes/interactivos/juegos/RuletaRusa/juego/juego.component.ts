import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Arma, IObjeto } from '../../../../../../assets/utilidades/ruleta';
import { Objeto } from '../../../../../clases/juegos/ruleta/objeto';
import { obj_data, obj_ids } from '../../../../../../assets/utilidades/rr_obj_desc';
import { Jugador } from '../../../../../clases/juegos/ruleta/jugador';
import { IA } from '../../../../../clases/juegos/ruleta/ia';
import { Adermicina } from '../../../../../clases/juegos/ruleta/objetos/adermicina';
import { Partidalol } from '../../../../../clases/juegos/ruleta/objetos/partidalol';
import { Plata } from '../../../../../clases/juegos/ruleta/objetos/plata';
import { LoggerService } from '../../../../../servicios/juegos/Ruleta/logger.service';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {

    public logger: LoggerService = inject(LoggerService);
    
    private gun: Arma = {cartucho:[1,0],dano:1};
    
    public playerTurn: boolean = false;

    private shotsLeft: number = 0; //Se setea cada vez que se hace reload o se dispara.    
    private realShotsLeft: number = 0;
    
    public jugador: Jugador|undefined;
    public enemigo: IA|undefined;
    public jugadorMuerto: boolean = false;
    public enemigoMuerto: boolean = false;

    public disabledControls: boolean;
    public disablePUButton: boolean = false;

    private round: number = 0;    

    public audioRecarga: any;
    public audioGatillo: any;
    public audioDisparo: any;
    public audioSuspenso: any;
    public audioAdermicina: any;
    public audioLoL: any;
    public audioPlata: any;
    public audioMusica: any;

    public esMuerteSubita: boolean = false;
    private pausa: boolean = false;

    public popupWin: boolean = false;
    public popupGameOver: boolean = false;

    constructor()
    {
        this.disabledControls = true;        
        this.CreateNewGame();                      
    }
    
    ngOnInit():void{
        this.audioDisparo = document.getElementById('disparo');
        this.audioGatillo = document.getElementById('gatillo');
        this.audioRecarga = document.getElementById('recarga');

        this.audioSuspenso = document.getElementById('suspenso');

        this.audioAdermicina = document.getElementById('adermicina');
        this.audioLoL = document.getElementById('lol');
        this.audioPlata = document.getElementById('plata');
        this.audioMusica = document.getElementById('muerteSubita');
    }

    /*Luego de que cargan todos los componentes, cada 500MS se hace scroll hacia abajo en el 'logger' automáticamente.
    ngAfterViewInit(): void
    {
        this.logC = document.getElementById('logger');
        if (this.logC)
        {
            window.setInterval(() =>
            {
                this.logC!.scrollTop = this.logC!.scrollHeight;
            }, 500);
        }
    }*/

    public get obtenerDataArma(): Arma
    {
        return this.gun;
    }

    public get obtenerBalasRealesFaltantes(): number
    {
        return this.realShotsLeft;
    }

    public get controlsDisabled(): boolean
    {
        return this.disabledControls;
    }

    public get obtenerRound(): number
    {
        return this.round;
    }

    public get obtenerBalasTotalesRestantes(): number{
        return this.shotsLeft;
    }

    public get obtenerCartuchoOrdenado(){
        let copia = this.gun.cartucho;
        copia.sort((a: any, b: any) => b - a);
        return copia;
    }

    public set danoArma(dmg: number){
        this.gun.dano = dmg;
    }

    public simularEspera(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async CreateNewGame()
    {
        this.pausa = false;
        this.esMuerteSubita = false;
        this.logger.clearLogs();
        this.popupWin= false;
        this.popupGameOver = false;
        this.logger.addLog("Creando nueva partida...","Partida");
        
        if(this.audioMusica){
        this.audioMusica.pause();
        this.audioMusica.currentTime = 0;
        }

        this.esMuerteSubita = false;
        this.disabledControls = true;        
        this.gun.dano = 1;        
        this.round = 0;

        this.jugador = new Jugador('Humano', 3); //Obtener el username de firebase para el nombre
        this.enemigo = new IA('IA',this, this.logger, 3, undefined); //Pedir input o utilizar defaults para el nombre       


        await this.Reload();
        this.playerTurn = true;
        this.disabledControls = false;
    }

    /*
    * Rounds: Cantidad de balas totales dentro del gun. (Tanto reales como placebo) | (<= 8 && >= 4)
    * TrueBulletsCount: Cantidad de balas REALES dentro del gun. | (<= rounds/2 && >= 1)
    * Esta funcion se ejecuta al inicio de cada ronda
    */
    public async Reload(randomMode: boolean = true, rounds: number = 4, trueBulletsCount:number = 2): Promise<void>
    {                
        this.logger.addLog('Iniciando una ronda nueva...');
        await this.simularEspera(3500);    
        
        this.jugadorMuerto = false;
        this.enemigoMuerto = false;
        this.logger.clearLogs();
        this.logger.addLog('Se recarga el arma...');

        await this.simularEspera(2000);
        this.logger.addLog('Repartamos los items!');
        this.giveRandomItem(this.enemigo);
        await this.simularEspera(2500);
        this.giveRandomItem(this.jugador);        
        this.disablePUButton = false;

        if(rounds < 4 || rounds > 8)
        {
            console.warn('[RR] rounds must be lower|equal than 8 and higher|equal than 4, got ' + rounds + '. Default value (4) applied.');
            rounds = 4;
        }        

        if(trueBulletsCount > (rounds/2) || trueBulletsCount < 1)
        {
            console.warn('[RR] trueBulletsCount must be lower or equal than half rounds and higher or equal than 1, got ' + trueBulletsCount + '. Default value (2) applied.');
            trueBulletsCount = 2;
        }

        if(randomMode){
            rounds = Math.floor(Math.random() * (8 - 4) + 4);
            trueBulletsCount = Math.floor(Math.random() * ((rounds/2) - 1) + 1);
        }

        let trueBulletsIndexes: number[] = [];

        for(let i:number = 0; i<trueBulletsCount; i++){
            let randomIndex = Math.floor(Math.random() * rounds);
            while(trueBulletsIndexes.includes(randomIndex)){
                randomIndex = Math.floor(Math.random() * rounds);
            }
            trueBulletsIndexes.push(randomIndex);
        }

        for(let i:number = 0; i<rounds; i++){
            if(trueBulletsIndexes.includes(i)){
                this.gun.cartucho[i] = 1;
                continue;
            }
            this.gun.cartucho[i] = 0;
        }

        this.shotsLeft = this.gun.cartucho.length;
        this.realShotsLeft = trueBulletsCount;
        console.log('[RR] Cartucho final: '+ this.gun.cartucho + '| '+this.shotsLeft+' balas en total.' + '| '+this.realShotsLeft+' balas reales.');  
        
        await this.simularEspera(2000);
        this.audioRecarga?.play();
        
        
        if(this.enemigo?.obtenerVidas == 1 && this.jugador?.obtenerVidas == 1){
            this.logger.addLog('Ambos a UNA VIDA, a TODO O NADA... '+ rounds +' balas, '+ trueBulletsCount +' de ellas son letales...');
            this.audioMusica.play();
            this.esMuerteSubita = true;            
        }else{
            
            this.audioMusica.pause();
            this.audioMusica.currentTime = 0;
            
            this.logger.addLog('Todo listo: '+ rounds +' balas, '+ trueBulletsCount +' de ellas son letales... Comenzando la ronda!');
        }
        this.actualizarCartuchoUI();
        this.round++;
        return;
    }

    public async turnOfPlayer(playerTurn: boolean)
    {      
        this.playerTurn = playerTurn;
        if(!playerTurn){
            await this.simularEspera(1000);
            this.logger.addLog('Le toca a tu rival...');
            await this.simularEspera(1000);        
            this.enemigo?.startTurn(); //por aca esta el temita
        }
        else{        
            await this.simularEspera(1000);
            this.logger.addLog('Es tu turno...');
            await this.simularEspera(1000);        
        }
    }

    public async shot(toPlayer: boolean = true)
    {     
        this.logger.clearLogs();
        this.disabledControls = true;
        
        this.audioSuspenso.play();
        await this.simularEspera(2500);

        let round = this.gun.cartucho[this.shotsLeft - 1]
        delete this.gun.cartucho[this.shotsLeft - 1];
        this.shotsLeft--;
        this.actualizarCartuchoUI();
        
        if(round == 1){

            if(toPlayer){
                this.audioDisparo?.play();
                this.logger.addLog("BUM! Recibiste un disparo!", "Partida");
                this.jugadorMuerto = true;
                //El jugador pierde una vida.
                this.jugador?.quitarVidas(this.gun.dano);
                if(this.jugador && this.jugador?.obtenerVidas<=0){
                    this.pausa = true;
                    this.popupGameOver = true;
                    return;
               }
                //Se recarga.
                await this.simularEspera(2500);
                //this.logger.clearLogs();
                await this.Reload();
                //Turno del jugador nuevamente.
                await this.turnOfPlayer(true);
            }else{
                this.audioDisparo?.play();
                this.logger.addLog("BUM! El enemigo recibió un disparo!", "Partida");
                this.enemigoMuerto = true;
                //El enemigo pierde una vida.
                this.enemigo?.quitarVidas(this.gun.dano);
                if(this.enemigo && this.enemigo?.obtenerVidas<=0){
                    this.pausa = true;
                    this.popupWin = true;
                    return;
               }
        
                //Se recarga.
                await this.simularEspera(2500);
                //this.logger.clearLogs();
                await this.Reload();
                //Turno del enemigo.
                await this.turnOfPlayer(false);
            }
        }else{
            
            if(toPlayer){
                await this.simularEspera(1000);
                this.audioGatillo?.play();
                this.logger.addLog("Te salvaste de un disparo...", "Partida");
                //Te disparaste y no pasó nada.
                //Otro turno extra para el jugador.
                await this.turnOfPlayer(true);
            }else{
                await this.simularEspera(1000);
                this.audioGatillo?.play();
                this.logger.addLog("El enemigo safó de un disparo...", "Partida");
                //Le disparaste al rival y no pasó nada.
                //Cambio de turno al rival.
                await this.turnOfPlayer(false);
            }
        }
        this.disabledControls = false;
        this.gun.dano = 1; //reinicio el dmg     
    }

    private giveRandomItem(toPlayer?:Jugador): void
    {
        if(!toPlayer){
            console.error("No se pueden repartir items, ya que uno de los jugadores no fue inicializado.");
            return;
        }

        let randomItemIndex = Math.floor(Math.random() * obj_ids.length);         
        let itemID = obj_ids[randomItemIndex];
        
        let item;        
        switch(itemID)
        {
            case 'obj_adermicina':
                item = new Adermicina(toPlayer, this.logger,this);                
                break;
            
            case 'obj_lol':
                item = new Partidalol(this, this.logger);
                break;

            case 'obj_plata':
                item = new Plata(this, this.logger);
                break;
            default: item = new Adermicina(toPlayer, this.logger, this);
        }

        if(toPlayer.obtenerInventario.length>= 6){
            console.warn("No se puede dar el item al jugador, su inventario está lleno.");
            return;
        }

        toPlayer.agregarAlInventario = item;        
        console.log("Se le agregó "+item.name+" al inventario de: "+toPlayer.obtenerNombre);

        if(toPlayer.obtenerNombre == "Humano")
        {
            this.logger.addLog("Obtuviste: "+item.name, "Partida");
        }
        return;
    }

    public runItemCleaner(jugador:Jugador): number
    {
        for(let i=0; i<jugador.obtenerInventario.length; i++){
            if(jugador.obtenerInventario[i].fueUsado){
                delete jugador.obtenerInventario[i]; //Deja undefined en el indice. ojo.
            }
        }
        return 0;
    }

    public actualizarCartuchoUI()
    {        
        let copia = this.gun.cartucho.slice();        
        copia.sort((a: any, b: any) => b - a);
        return copia;
    }

    public usarObjeto(){
        this.jugador?.utilizarObjeto(0);
        this.jugador?.vaciarInventario();
        this.checkearExistenciaDeItems();
    }

    public checkearExistenciaDeItems(){
        if(this.jugador && this.jugador.obtenerInventario.length <= 0){
            this.disablePUButton = true;
        }
        else{
            this.disablePUButton = false;
        }
    }

}
