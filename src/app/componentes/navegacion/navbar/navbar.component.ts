import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink,} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {  
  showNavbar: boolean;
  exceptNavbarRoutes: string[] = ['/login', '/register'];
  actualRoute: string = '';
  isUserLogged:boolean = false;

  constructor(private router: Router)
  {
    this.showNavbar = false;
    router.events.subscribe((val)=>{          
      if(val instanceof NavigationEnd)
      {
        console.log('Ruta: '+val.url);
        this.checkLogin();
        if(this.exceptNavbarRoutes.includes(val.url))
        {
          this.showNavbar = false;          
        }
        else
        {
          this.showNavbar = true;
        }        
        this.actualRoute = val.url;
      }      
    });
  }

  public checkLogin()
  {
    //console.warn('Checkeando si el user esta logueado...');
    let repositorio = localStorage.getItem('session');
    if(repositorio != null)
    {
      this.isUserLogged = true;
    }
    else
    {
      this.isUserLogged = false;
    }
  }
}
