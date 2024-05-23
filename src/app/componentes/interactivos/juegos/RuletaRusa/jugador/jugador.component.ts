import { Component } from '@angular/core';
import { IObjeto } from '../../../../../../assets/utilidades/ruleta';

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent {
    public vidas: number = 4;
    private inventario: IObjeto[] = [];

    constructor(){}

    public agregarObjeto(objeto: IObjeto){
        this.inventario.push(objeto);
    }

    public usarObjeto(indice: number){
        this.inventario[indice].usar();
    }

    public obtenerInventario(): IObjeto[]
    {
        return this.inventario;
    }
}
