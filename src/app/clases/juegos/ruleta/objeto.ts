import { obj_data } from "../../../../assets/utilidades/rr_obj_desc";
import { IObjeto } from "../../../../assets/utilidades/ruleta";

export class Objeto implements IObjeto {
    public id: string;
    readonly descripcion: string;
    public pathImagen: string;

    constructor(id: string)
    {
        this.id = id;
        this.descripcion = "Sin descripción";
        this.pathImagen = "";
        
        for(let i:number = 0; i < obj_data.length; i++){
            if(obj_data[i].id === this.id){
                this.descripcion = obj_data[i].descripcion;
                this.pathImagen = obj_data[i].imagen;
            }
        }
    }

    public usar(): void
    {
        console.log("Objeto usado");
    }
}
