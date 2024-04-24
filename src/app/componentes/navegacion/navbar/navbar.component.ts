import { Component } from '@angular/core';
import { NavigationEnd, Router,} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {  
  showNavbar: boolean;
  exceptNavbarRoutes: string[] = ['/login', '/register'];

  constructor(private router: Router)
  {
    this.showNavbar = false;
    router.events.subscribe((val)=>{      
      if(val instanceof NavigationEnd)
      {
        console.log(val.url);
        if(this.exceptNavbarRoutes.includes(val.url))
        {
          this.showNavbar = false;          
        }
        else
        {
          this.showNavbar = true;
        }
        console.warn(this.showNavbar);
      }
    });
  }
}
