import { Component } from '@angular/core';
import { ChatControlComponent } from '../../componentes/interactivos/chat-control/chat-control.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatControlComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
