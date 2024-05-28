import { obj_data } from "../../../../assets/utilidades/rr_obj_desc";
import { IObjeto } from "../../../../assets/utilidades/ruleta";
import { LoggerService } from "../../../servicios/juegos/Ruleta/logger.service";

export abstract class Objeto implements IObjeto {
    public id: string;
    readonly name: string;
    readonly descripcion: string;
    public pathImagen: string;
    private usado: boolean;

    public logger: LoggerService

    constructor(id: string, logger: LoggerService)
    {
        this.id = id;
        this.descripcion = "Sin descripción";
        this.pathImagen = "";
        this.name = "Sin nombre";
        this.usado = false;
        this.logger = logger;

        for(let i:number = 0; i < obj_data.length; i++){
            if(obj_data[i].id === this.id){
                this.name = obj_data[i].nombre;
                this.descripcion = obj_data[i].descripcion;
                this.pathImagen = obj_data[i].imagen;
            }
        }
    }

    public get fueUsado(): boolean
    {
        return this.usado;
    }

    public usar(): void
    {
        this.marcarComoUsado();
    }

    public marcarComoUsado(): void{
        this.usado = true;
    }
}
