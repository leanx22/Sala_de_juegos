import { Injectable } from '@angular/core';
import { palabras as ColeccionPalabras } from '../../../../assets/utilidades/palabras';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private palabras: string[] = ColeccionPalabras;
  private palabraSeleccionada: string = "";
  private indicesUsados: number[] = [];

  constructor()
  {    
  }

  private generarIndice(): number
  {
    return Math.floor(Math.random() * this.palabras.length);
  }

  public reiniciarIndicesUtilizados(): void
  {
    this.indicesUsados = [];
  }

  public generarPalabra(): void
  {
    let indice = this.generarIndice();
    let intento = 0;
    
    while(this.indicesUsados.includes(indice))
    {
      intento++;
      if(intento >= this.palabras.length)
      {
          console.warn('Todas las palabras fueron adivinadas.');
          this.reiniciarIndicesUtilizados();
          intento = 0;
      }
      indice = this.generarIndice();
    }
    this.indicesUsados.push(indice);
    this.palabraSeleccionada = this.palabras[indice];
  }

  get obtenerPalabraSeleccionada(): string
  {
    return this.palabraSeleccionada;
  }

}
