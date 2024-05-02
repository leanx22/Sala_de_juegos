import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { User } from '@angular/fire/auth';

import { FirestoreService } from '../../servicios/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  private authService: AuthService = inject(AuthService);

  constructor(private router: Router, private firestoreService: FirestoreService){
    //mando el router ya que si no hago eso angular se vuelve loquito y cuando lo llamo desde redirectWhenSuccess usando this me dice que es undefined, wtf!
    this.authService.authState$.subscribe((user)=>{this.redirectWhenSuccess(user, router)});
  }

  private async redirectWhenSuccess(user: User|null, router: Router)
  {
    console.log('hubieron cambios: ');
    if(user)
    {
      console.log('user existe, está la sesion iniciada asi que guardo el log');
      await this.saveUserLog(user);
      console.log('ahora redirecciono...');
      router.navigate(['']);
    }
    else
    {
      console.log('no hay user, asi que no hago na.');
    }
  }

  private async saveUserLog(user: User)
  {
      let fecha = new Date();    
      //console.log('fecha RAW: '+fecha+' fecha CUSTOM: ' + fecha.toLocaleString());
      this.firestoreService.guardar('userLogs', {usuario: user.email, fecha: fecha.toLocaleString("es-AR",{timeZone:'America/Argentina/Buenos_Aires'})})
      .then((doc: DocumentReference)=>{
        console.log('Log guardado: '+doc.id);
      });
  }
}
