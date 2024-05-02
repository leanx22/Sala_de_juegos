import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink,} from '@angular/router';

import { AuthService } from '../../../servicios/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {  
  public showNavbar: boolean;
  private exceptNavbarRoutes: string[] = ['/auth/register', '/auth/login'];
  public actualRoute: string = '';
  public isUserLogged:boolean | null = null;

  constructor(private router: Router, private authService: AuthService)
  {
    this.showNavbar = false;     
    router.events.subscribe((val)=>{this.checkRoutesAndToggle(val,this.exceptNavbarRoutes);}); 
    
    authService.authState$.subscribe((val: User | null)=>{
      this.onStateChange(val);
    });
  }

  checkRoutesAndToggle(val:any, excRoutes: string[])
  {
    if(val instanceof NavigationEnd)
    {
      if(excRoutes.includes(val.url))
      {
        this.showNavbar = false;          
      }
      else
      {
        this.showNavbar = true;
      }        
      this.actualRoute = val.url;      
    }  
  }

  onStateChange(user:User|null)
  {
    if(user)
    {
      console.log('Hay una sesión iniciada: '+user.email);
      this.isUserLogged = true;
    }
    else
    {
      console.log('El usuario no está logueado.');
      this.isUserLogged = false;
    }
  }

  cerrarSesionTemporal()
  {
    this.authService.CerrarSesion();
  }
}
