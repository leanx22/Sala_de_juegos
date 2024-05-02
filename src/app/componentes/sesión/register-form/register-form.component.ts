import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService, ICredenciales } from '../../../servicios/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  //private authService: AuthService = Inject(AuthService);
  //private router: Router = Inject(Router);
  public disableSubmit: boolean = false;
  public isLoading: boolean = false;
  public showErrorAlert: boolean = false;
  public errorMessage: string = "Ocurrió un error al registrarse.";

  registerForm: FormGroup = new FormGroup({
    correo: new FormControl(''),
    usuario: new FormControl(''),
    clave: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router)
  {
    this.authService.authState$.subscribe((state)=>{
      console.log('Pasó algo random: '+state?.email);
    });
  }

  public async Registrarse(): Promise<void>
  {
    if(this.registerForm.invalid) return;
    this.disableSubmit = true;
    this.isLoading = true;
    
    //Agregar el nombre de usuario!
    let datos: ICredenciales = {
      correo: this.registerForm.value.correo,
      clave: this.registerForm.value.clave
    }

    this.authService.RegistrarseConMailClave(datos)
    .then((userCredential: UserCredential)=>{
      console.log('Usuario registrado con éxito: '+userCredential.user);
    })
    .catch((e)=>{
       console.log('No se pudo registrar: '+JSON.stringify(e));
       this.disableSubmit = false;
       this.isLoading = false;
       if(e.code == "auth/invalid-email")
       {
        this.showError('La direccion de correo ingresada no es válida.');
       }
       else if(e.code == 'auth/email-already-in-use')
       {
          this.showError('Esta dirección de correo electrónico ya está en uso.');
       }
       else if(e.code == 'auth/weak-password')
       {
        this.showError('¡Esa contraseña es una papa! Pongamos algo un poco más seguro...');
       }
       else
       {
        this.showError();
       }
    });
  }

  public CerrarSesion():void
  {
    this.authService.CerrarSesion();
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

}