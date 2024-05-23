import { Component } from '@angular/core';
import { Arma, IObjeto } from '../../../../../../assets/utilidades/ruleta';
import { Objeto } from '../../../../../clases/juegos/ruleta/objeto';
import { obj_data, obj_ids } from '../../../../../../assets/utilidades/rr_obj_desc';
import { Jugador } from '../../../../../clases/juegos/ruleta/jugador';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {

    public gun: Arma = {cartucho:[0,0],dano:1};
    public playerTurn: boolean = false;
    private shotsLeft: number = 0;

    constructor()
    {
        this.Reload();
        this.shotsLeft = this.gun.cartucho.length;
    }

    /*
    * Rounds: Cantidad de balas totales dentro del gun. (Tanto reales como placebo) | (<= 8 && >= 4)
    * TrueBulletsCount: Cantidad de balas REALES dentro del gun. | (<= rounds/2 && >= 1)
    */
    public Reload(rounds: number = 4, trueBulletsCount:number = 2): void
    {
        if(rounds < 4 || rounds > 8)
        {
            console.warn('rounds must be lower|equal than 8 and higher|equal than 4, got ' + rounds + '. Default value (4) applied.');
            rounds = 4;
        }        

        if(trueBulletsCount > (rounds/2) || trueBulletsCount < 1)
        {
            console.warn('trueBulletsCount must be lower or equal than half rounds and higher or equal than 1, got ' + trueBulletsCount + '. Default value (2) applied.');
            trueBulletsCount = 2;
        }

        let trueBulletsIndexes: number[] = [];

        for(let i:number = 0; i<trueBulletsCount; i++){
            let randomIndex = Math.floor(Math.random() * rounds);
            while(trueBulletsIndexes.includes(randomIndex)){
                randomIndex = Math.floor(Math.random() * rounds);
            }
            trueBulletsIndexes.push(randomIndex);
        }

        console.log('Indices de balas reales: '+trueBulletsIndexes);

        for(let i:number = 0; i<rounds; i++){
            if(trueBulletsIndexes.includes(i)){
                this.gun.cartucho[i] = 1;
                continue;
            }
            this.gun.cartucho[i] = 0;
        }

        console.log('Cartucho final: '+ this.gun.cartucho);

        return;
    }

    public ToggleTurn()
    {
        this.playerTurn =!this.playerTurn;
    }

    public shot(toPlayer: boolean = true)
    {
        let round = this.gun.cartucho[this.shotsLeft -1]
        this.shotsLeft--;

        if(round == 1){

            if(toPlayer){
                //El jugador pierde una vida.
                //Se recarga.
                //Turno del jugador nuevamente.
            }else{
                //El enemigo pierde una vida.
                //Se recarga.
                //Turno del enemigo.
            }
        }else{
            
            if(toPlayer){
                //Te disparaste y no pasó nada.
                //Otro turno extra para el jugador.
            }else{
                //Le disparaste al rival y no pasó nada.
                //Cambio de turno al rival.
            }
        }        
    }

    private getRandomItem(toPlayer?:Jugador): IObjeto | null
    {
        let randomIdIndex = Math.floor(Math.random() * obj_ids.length);         

        let item: IObjeto = new Objeto(obj_ids[randomIdIndex]);
        
        if(toPlayer){
            if(toPlayer.obtenerInventario.length>= 6){
                console.warn("Inventario lleno!");
                return null;
            }
            toPlayer.agregarAlInventario = item;
        }

        return item;
    }

}
