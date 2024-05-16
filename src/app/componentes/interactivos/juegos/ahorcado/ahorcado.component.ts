import { Component, inject } from '@angular/core';
import { WordsService } from '../../../../servicios/juegos/ahorcado/words.service';
import { TecladoVirtualComponent } from '../../teclado-virtual/teclado-virtual.component';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [TecladoVirtualComponent],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {

  private wordsService: WordsService = inject(WordsService);
  private wordArray: string[] = [];
  public display: string[] = [];
  private letrasAdivinadas: number = 0;
  public vidas: number = 5;
  public palabrasAcertadas: number = 0;
  public showPopup: boolean = false;
  public showPopupWin: boolean = false;
  public letrasIncorrectas: string[] = [];
  public respuesta: string = "";

  constructor() {
    this.nuevoJuego();
  }

  public nuevoJuego()
  {
    this.letrasIncorrectas = [];
    this.showPopup = false;
    this.showPopupWin = false;
    this.letrasAdivinadas = 0;
    this.vidas = 5;
    this.wordsService.generarPalabra();
    console.log("La respuesta es: "+this.wordsService.obtenerPalabraSeleccionada);
    this.respuesta = this.wordsService.obtenerPalabraSeleccionada;
    this.wordArray = this.wordsService.obtenerPalabraSeleccionada?.split('');
    
    console.log(this.wordArray);

    this.display = this.wordArray?.map(() => ' _ ') || [];
  }

  public intentarLetra(letra: string):void
  {

    let letraCorrecta = false;
    for (let i = 0; i < this.wordArray.length; i++)
    {
      if(this.wordArray[i] == letra.toLowerCase())
      {
        this.display[i] = letra;
        delete this.wordArray[i];
        this.letrasAdivinadas++;
        letraCorrecta = true;
      }
    }

    if(!letraCorrecta)
    {
      if(!this.letrasIncorrectas.includes(letra))
      {
        this.letrasIncorrectas.push(letra);    
      }      
      
      this.vidas > 0 ? this.vidas-=1 : this.vidas;
      if(this.vidas<=0)
      {
        this.onEndGame();
      }
      return;
    }

    if(this.letrasAdivinadas == this.wordArray.length)
    {      
      this.onWin();
    }

  }

  public onWin()
  {
    this.palabrasAcertadas++;
    this.showPopupWin = true;
  }

  public onEndGame()
  {
    this.vidas = 0;
    this.showPopup = true;
  }

}
