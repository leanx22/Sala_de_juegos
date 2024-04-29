import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../servicios/auth-service.service';

import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  private authService: AuthServiceService = inject(AuthServiceService);
  private auth = inject(Auth);
  
  constructor()
  {
    //authService.Registrarse("admin@admin.com","Admin123");
    this.authService.Loguearse("admin@admin.com","Admin123");
    onAuthStateChanged(this.auth, (user)=>{
      if(user)
      {
        console.warn("logueado desde home: "+user.uid);
      }
      else
      {
        console.warn("No toy logueao desde HOME...");
      }
    })
  }

  public test()
  {
    this.authService.CerrarSesion();
  }

}
