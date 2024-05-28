import { IObjeto } from "../../../../assets/utilidades/ruleta";
import { Objeto } from "./objeto";

export class Jugador{
    private inventario: Objeto[];
    private vidas: number;
    private nombre: string;

    constructor(nombre: string, vidas:number = 5, inventario?: Objeto[]) {
        this.vidas = vidas;
        if(vidas>5){
            console.warn("lives must be lower than 6 and higher than 0. "+vidas+" provided. Default value (5) was applied.");
            this.vidas = 5;
        }

        this.inventario = [];
        //verificar si el inventario es muy grande y cortarlo al maximo (6 items max.)

        this.nombre = nombre;
        if(inventario){
            this.inventario = inventario;
        }

    }

    public get obtenerNombre(): string
    {
        return this.nombre;
    }

    public get obtenerInventario(): Objeto[]{
        return this.inventario;
    }

    public set agregarAlInventario(objeto: Objeto){        
        /*
        for(let i=0; i<this.inventario.length; i){
            if(this.inventario[i] == undefined || this.inventario[i] == null || this.inventario[i].fueUsado){
                this.inventario[i] = objeto;
            }
        }
        */
        this.inventario = [];
        this.inventario.push(objeto);
    }

    public get obtenerVidas(): number
    {
        return this.vidas;
    }

    public obtenerCantidadXitem(id: string): number
    {
        return this.inventario.filter(item => item.id === id).length;    
    }

    public utilizarObjeto(index: number)
    {
        this.inventario[index].usar();        
    }

    public aumentarVidas(cantidad: number = 1): void
    {
        this.vidas += cantidad;
        //dev
        console.log('Se sumaron ('+cantidad+') vidas');
    }

    public vaciarInventario(){
        this.inventario = [];
    }

    public quitarVidas(cantidad: number = 1): void
    {        
        this.vidas -= cantidad;
        //dev
        console.log('Se quitaron ('+cantidad+') vidas a '+this.nombre);
    }

}
