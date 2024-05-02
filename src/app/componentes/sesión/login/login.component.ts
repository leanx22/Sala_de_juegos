import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

import { AuthService, ICredenciales } from '../../../servicios/auth.service';

import { environment } from '../../../../environments/environment.development'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //Por alguna razon Inject() no funciona, tengo que usar si o si el constructior para inyectar...
  //private authService: AuthService = Inject(AuthService);  

  public disableSubmit: boolean = false;
  public isLoading: boolean = false;

  public errorMessage: string = "Ocurrió un error al intentar iniciar sesión."
  public showErrorAlert: boolean = false;

  public email: string = "";
  public password: string = "";

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
    this.isLoading = true;

    let datos: ICredenciales = {
      correo: this.logInForm.value.correo,
      clave: this.logInForm.value.clave,
    };
    
    this.authService.IngresarConMailClave(datos)
    .then((userCredential: UserCredential)=>{
      console.log('Sesión iniciada con éxito: '+userCredential.user);
    })
    .catch((e)=>{
       this.disableSubmit = false;
       this.isLoading = false;
       console.log(e.code);
       if(e.code == 'auth/invalid-credential')
       {
          this.showError('Credenciales de inicio de sesión incorrectas.');
       }
       else if(e.code == 'auth/invalid-email')
       {
         this.showError('La dirección de correo no es válida.');
       }
       else
       {
        this.showError();
       }
       
    });

  }

  public cancelar(): void
  {
    this.router.navigate(['']);
  }

  public showError(message?: string): void
  {
    if(message)
    {
      this.errorMessage = message;
    }

    this.showErrorAlert = true;
  }

  public onAutoLoginChange(event: any): void
  {
    let selected = event.target.value;
    if(selected == 0 || environment.isProduction)  return;
    this.email = environment.testUsersCredentials[selected].email;
    this.password = environment.testUsersCredentials[selected].password;
  }
}
