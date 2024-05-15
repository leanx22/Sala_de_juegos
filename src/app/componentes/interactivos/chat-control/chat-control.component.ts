import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../../servicios/firestore.service';
//import { DocumentData } from '@angular/fire/firestore';
import { AuthService } from '../../../servicios/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-chat-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-control.component.html',
  styleUrl: './chat-control.component.css'
})


export class ChatControlComponent {

  private chatService: FirestoreService = inject(FirestoreService);
  public chats: any[] = [];
  private authService: AuthService = inject(AuthService);

  constructor(){
    this.chatService.traerDatos('chats').subscribe((chats)=>{
      this.chats = chats;

      this.chats = this.orderMessagesByDate(chats);
      console.log(this.chats);
    });
    //dev//this.chats = [{message: 'Hello', author: 'bar', date: '15/5/2024, 16:56:52'}, {message: 'Hello for you too!', author: 'foo', date: '15/5/2024, 16:56:52'}];
  }

  public messageForm: FormGroup = new FormGroup({
    message: new FormControl('',[Validators.required]),    
  });


  get getCurrentUserEmail():string | null | undefined
  {
    return this.authService.getCurrentUser?.email;
  }

  public sendMessage(): void
  {
    if(this.messageForm.untouched || !this.messageForm.valid)
    {
      console.warn('No se puede enviar un mensaje vacio o inválido');
      return;
    }

    let date = new Date();
    let sendData = {
      author: this.getCurrentUserEmail,
      message: this.messageForm.value.message,
      date: date.toLocaleString("es-AR",{timeZone:'America/Argentina/Buenos_Aires'}),
      time: new Date().getTime(),
    };
    
    this.messageForm.reset();

    this.chatService.guardar('chats',sendData).then(()=>{      
      console.log('Mensaje enviado!');
    });
  }

  private orderMessagesByDate(chats: any[])
  {    
    return chats.sort((a:any, b:any) => {
      return a.time - b.time;
    });
  }


}
