import { Injectable } from '@angular/core';
import { preguntas, IPregunta as Pregunta} from '../../../../assets/utilidades/preguntas';
@Injectable({
  providedIn: 'root'
})
export class ProveedorPreguntasService {

    private indicesUtilizados: number[] = [];    

    constructor() { }

    public obtenerPregunta(): Pregunta
    {        
        let intentos = 0;
        let indice = this.obtenerIndiceAleatorio();
        while (this.indicesUtilizados.includes(indice))
        {
            console.warn("El indice seleccionado es "+indice+" pero ya fue utilizado, volviendo a generar.");
            intentos++;
            indice = this.obtenerIndiceAleatorio();
            
            /*Podría darse el caso, aunque muuuuuuy poco matemáticamente probable, que luego
            de 20 intentos no encuentre la pregunta que no se repitió. Mientras más alto sea el número, menos probable de que esto pase.
            colocando el doble de la cantidad de preguntas totales es un numero más que seguro.
            Se puede optimizar.
            */
            if(intentos >= 20)
            {
                this.reiniciarIndices();
                console.warn("No se pudo encontrar una pregunta nueva, se va a reiniciar el índice de las preguntas ya realizadas luego de "+intentos+" intentos de búsqueda.");
            }
        }
        console.log("Se retorna la pregunta con indice ["+indice+"] | Indices ya utilizados: ["+this.indicesUtilizados+"]");
        this.indicesUtilizados.push(indice);
        return preguntas[indice];
    }

    private obtenerIndiceAleatorio(): number
    {
        return Math.floor(Math.random() * preguntas.length);
    }

    public reiniciarIndices(): void
    {
        this.indicesUtilizados = [];
    }
}
