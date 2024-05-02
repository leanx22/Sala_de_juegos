import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { UserCredential } from '@angular/fire/auth';

import { AuthService, ICredenciales } from '../../../servicios/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //Por alguna razon Inject() no funciona, tengo que usar si o si el constructior para inyectar...
  //private authService: AuthService = Inject(AuthService);  

  public disableSubmit: boolean = false;

  logInForm: FormGroup = new FormGroup({
    correo: new FormControl(''),
    clave: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router)
  {
    //this.authService = authService;
  }

  public async IniciarSesion(): Promise<void>
  {
    this.disableSubmit = true;
    let datos: ICredenciales = {
      correo: this.logInForm.value.correo,
      clave: this.logInForm.value.clave,
    };

    this.authService.IngresarConMailClave(datos)
    .then((userCredential: UserCredential)=>{
      console.log('Sesión iniciada con éxito: '+userCredential.user);
    })
    .catch((e)=>{
       console.error('No se pudo iniciar sesión: '+e.message);
       this.disableSubmit = false;
    });

  }

  public cancelar(): void
  {
    this.router.navigate(['']);
  }

}
