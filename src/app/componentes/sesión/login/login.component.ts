import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  users:any = [];

  email:string = '';
  password:string = '';

  isLoggedIn = false;

  constructor(private router:Router)
  {           
    this.GenerateTestUsers();
    this.users = this.GetUsers();
  }

  public GenerateTestUsers()
  {
    if(localStorage.getItem('users') != null)
    {
      console.warn('Los usuarios de prueba ya existen, no se van a crear ni actualizar!');
      return;
    }
    console.log('Creando usuarios de prueba...');
    
    this.users.push({
      'email':'admin@admin.com',
      'password': 'admin123',       
    });

    this.users.push({
      'email':'user@user.com',
      'password': 'user123',            
    });

    let json = JSON.stringify(this.users);
    localStorage.setItem('users', json);
  }

  public GetUsers()
  {
    let repositorio = localStorage.getItem('users');
    if(repositorio == null)
    {
      console.error('No existe repo de usuarios local.');
      return;
    }

    let data = JSON.parse(repositorio);
    return data;
  }

  public LogIn()
  {
    let actualUser;
    this.users.forEach((user:any) => {
      if(user.email == this.email && user.password == this.password)
      {
        console.log('Sesion iniciada!');
        
        actualUser = {
          'isLoggedIn': true,
          'user':this.email
        };
        
        let json = JSON.stringify(actualUser);
        localStorage.setItem('session', json);

        this.isLoggedIn = true;
        this.GoHome();
      }
    });
  }

  public GoHome()
  {
    const url = '';
    this.router.navigate([url]);
  }

}
