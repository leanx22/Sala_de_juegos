import { IObjeto } from "../../../../assets/utilidades/ruleta";

export class Jugador{
    private inventario: IObjeto[] = [];

    constructor(){}

    public get obtenerInventario(): IObjeto[]{
        return this.inventario;
    }

    public set agregarAlInventario(objeto: IObjeto){
        this.inventario.push(objeto);
    }

}
