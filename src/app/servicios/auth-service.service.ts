import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

//import { Auth } from '@angular/fire/auth';
import { signOut, getAuth, onAuthStateChanged, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
//import { FirebaseApp, initializeApp } from '@angular/fire/app';


@Injectable({
  providedIn: 'root'
})

//https://stackoverflow.com/questions/77828134/firebase-not-working-properly-on-angular-17
export class AuthServiceService {

  //private firebaseAuth: AngularFireAuth = inject(AngularFireAuth)  

  user:any = null;

  private auth: Auth = inject(Auth);

  constructor()
  {
    onAuthStateChanged(this.auth, (user)=>{
      if(user)
      {
        console.warn("Toy logueao: "+user.uid);
      }
      else
      {
        console.warn("No toy logueao...");
      }
    })
  }

  public async Registrarse(correo:string, clave:string)
  {
     createUserWithEmailAndPassword(this.auth, correo, clave).then((credenciales) => {
      this.user = credenciales.user;
      console.log(this.user);
     }).catch((err) => {
      console.error(err.message);
     }
    );
  };

  public async Loguearse(correo:string, clave:string)
  {
    signInWithEmailAndPassword(this.auth, correo, clave).then((credenciales: any) => {
      this.user = credenciales.user;
      console.log('Logueado como: '+this.user.email);
    }).catch((e)=>{
      console.warn('Error al iniciar sesión: '+e.message);
    });    
  };
  public CerrarSesion()
  {
    signOut(this.auth).then(()=>{
      console.log('Sesión cerrada con éxito!');
    }).catch((error)=>{
      console.error('Error al cerrar sesión: '+error.message);
    });
  };  
}
