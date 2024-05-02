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

  registerForm: FormGroup = new FormGroup({
    correo: new FormControl(''),
    usuario: new FormControl(''),
    clave: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router)
  {
    this.authService.authState$.subscribe((state)=>{
      console.log('Pasó algo random: '+JSON.stringify(state));
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
       console.error('No se pudo registrar: '+e.message);
       this.disableSubmit = false;
       this.isLoading = false; 
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
  
}