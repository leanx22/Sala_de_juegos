import { Component } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {
  public racha: number = 0;
  public numero_actual: number = 0;
  public showGameOver: boolean = false;
  public showGameWin: boolean = true;
  public next: number = 0;

  constructor()
  {
    this.nuevoJuego();
  }

  private generarCarta(): number
  {
    return Math.floor(Math.random() * (12 - 1 + 1)) + 1;
  }

  public nuevoJuego()
  {
    this.showGameOver = false;
    this.showGameWin = false;
    this.racha = 0;
    this.numero_actual = this.generarCarta();
  }

  private onAdivina():void
  {
    this.racha++;

    if(this.racha >= 10)
    {
        this.onGameWin();
    }
  }

  private onGameOver():void
  {
    this.showGameOver = true;
  }

  private onGameWin():void
  {
    this.showGameWin = true;
  }

  public intentar(mayor: boolean):void
  {
    let next = this.generarCarta();
    
    while(next == this.numero_actual)
    {
        next = this.generarCarta();
    }
    
    this.next = next;
    if((mayor && next >= this.numero_actual) || (!mayor && next <= this.numero_actual))
    {
        this.onAdivina();
        this.numero_actual = next;
    }
    else
    {
        this.onGameOver();
    }

  }
}
