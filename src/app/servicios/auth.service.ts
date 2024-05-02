import { Inject, Injectable, inject } from '@angular/core';
import { signOut, onAuthStateChanged, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, authState, User, getAuth } from '@angular/fire/auth';

export interface ICredenciales{
  correo: string;
  clave: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://stackoverflow.com/questions/77828134/firebase-not-working-properly-on-angular-17
  //private auth: Auth = Inject(Auth);
  readonly authState$ = authState(this.auth);
  private isLogged: boolean = false;

  public constructor(private auth:Auth)
  {
    this.authState$.subscribe((user: User|null) => {
      this.isLogged = user ? true:false;
    });
  }

  get isUserLoggedIn()
  {
    return this.isLogged;
  }

  public RegistrarseConMailClave(credenciales: ICredenciales): Promise<UserCredential>
  {
    return createUserWithEmailAndPassword(this.auth, credenciales.correo, credenciales.clave);
  }

  public IngresarConMailClave(credenciales: ICredenciales): Promise<UserCredential>
  {
    return signInWithEmailAndPassword(this.auth, credenciales.correo, credenciales.clave);
  }

  public CerrarSesion(): Promise<void>
  {
    return this.auth.signOut();
  }

}
