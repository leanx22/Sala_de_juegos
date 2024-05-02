import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { User } from '@angular/fire/auth';

import { FirestoreService } from '../../servicios/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { RegisterFormComponent } from '../../componentes/sesión/register-form/register-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RegisterFormComponent],
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
    if(user)
    {
      setTimeout(() =>{ //espero un poco antes de redireccionar.
        router.navigate(['']).then((success) =>{
          if (success)this.saveUserLog(user); //no sacar esto de acá porque se buguea mal y se guardan varios logs en vez de uno.
        });
      },4000);
    }
  }

  private async saveUserLog(user: User)
  {
      let fecha = new Date();    
      //console.log('fecha RAW: '+fecha+' fecha CUSTOM: ' + fecha.toLocaleString());
      this.firestoreService.guardar('userLogs', {usuario: user.email, fecha: fecha.toLocaleString("es-AR",{timeZone:'America/Argentina/Buenos_Aires'})})
      .then((doc: DocumentReference)=>{
        console.log('Log de inicio de sesión guardado. ID: '+doc.id);
      });
  }
}
