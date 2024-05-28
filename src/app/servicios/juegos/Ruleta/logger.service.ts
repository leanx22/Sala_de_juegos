import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
    public logs: string[] = ["[Arbitro] Inicio de partida!"];

    constructor() { }

    public addLog( message: string, author: string="Arbitro"){
        let log = "["+author+"] "+message;
        this.logs.push(log);
    }

    public clearLogs(): void
    {
        this.logs = [];
    }

}
