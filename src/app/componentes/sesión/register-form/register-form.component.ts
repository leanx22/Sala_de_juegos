import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, ICredenciales } from '../../../servicios/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User, UserCredential, updateProfile } from '@angular/fire/auth';

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
    correo: new FormControl('',[Validators.required, Validators.email]),
    nombreUsuario: new FormControl('', [Validators.required, Validators.min(3)]),
    clave: new FormControl('',[Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router)
  {}

  public async Registrarse(): Promise<void>
  {
    if(this.registerForm.invalid)
    {
      this.showError('Los datos del formulario no son válidos o faltan datos.');
      return;
    };

    this.disableSubmit = true;
    this.isLoading = true;
    
    let datos = {
      correo: this.registerForm.value.correo,
      clave: this.registerForm.value.clave,
      nombreUsuario: this.registerForm.value.nombreUsuario,
    }

    this.authService.RegistrarseConMailClave(datos)
    .then((userCredential: UserCredential)=>{
      updateProfile(userCredential.user, {displayName: this.registerForm.value.nombreUsuario})
      .then(()=>{
        console.log('Se terminó de actualizar el "displayName" del nuevo usuario en firebase. (UPDATEPROFILE)');
      });
    })     
    .catch((e)=>{
      console.error('No se pudo registrar al usuario (CATCH): '+JSON.stringify(e));
      this.disableSubmit = false;
      this.isLoading = false;
      this.showError(this.getErrorMessage(e.code));
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

  public getErrorMessage(errCode: string): string
  {
    switch(errCode)
    {
      case 'auth/email-already-in-use':
        return 'Esta dirección de correo electrónico ya está en uso.';
      
      case 'auth/invalid-email':
        return 'La dirección de correo ingresada no es válida.';
      
      case 'auth/weak-password':
        return '¡Esa contraseña es una papa! Pongamos algo un poco más seguro...';
      
      default:
        return 'Ocurrió un error al registrarse.';
    }

  }

}