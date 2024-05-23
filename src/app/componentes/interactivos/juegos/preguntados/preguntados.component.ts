import { Component, inject } from '@angular/core';
import { PexelsService } from '../../../../servicios/pexels.service';
import { ProveedorPreguntasService as PService } from '../../../../servicios/juegos/preguntados/proveedor-preguntas.service';
import { IPregunta as Pregunta } from '../../../../../assets/utilidades/preguntas';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
    private images: PexelsService = inject(PexelsService);
    private PS: PService = inject(PService);
    public imageUrl: string = "";
    public pregunta: Pregunta;
    public puntos: number = 0;

    public isLoading: boolean;

    public showGameOver: boolean = false;
    public showGameWin: boolean = false;
    public showCorrectAnswerPopup:boolean = false;

    constructor()
    {
        this.isLoading = true;
        this.pregunta = {
            pregunta: "Cargando...",
            respuestas: ["Cargando","porfa","espera"],
            respuestaCorrecta: "",
            idCorrecta: -1,
            tematica: "wait"
        };
        this.nuevoJuego();
        this.isLoading = false;
    }

    public nuevoJuego()
    {
        this.puntos = 0;
        this.showGameOver = false;
        this.showGameWin = false;
        this.showCorrectAnswerPopup = false;
        this.PS.reiniciarIndices();
        this.nuevaPregunta();
    }

    public nuevaPregunta()
    {
        this.showCorrectAnswerPopup = false;
        this.pregunta = this.PS.obtenerPregunta();
         this.images.searchImage(this.pregunta.tematica).subscribe((respuesta)=>{
             this.imageUrl = respuesta.photos[0].src.small;
         });
    }

    public Responder(responseIndex: number): void
    {
        if(this.pregunta.idCorrecta == responseIndex)
        {
            this.puntos++;
            console.log(this.puntos);
            this.showCorrectAnswerPopup = true;
            if(this.puntos>=10)
            {
                this.showGameWin = true;
                return;
            }
        }
        else
        {
            this.showGameOver = true;
        }
        return;
    }

}
