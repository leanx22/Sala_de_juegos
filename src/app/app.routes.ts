import { Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './paginas/home/home.component';
import { AuthComponent } from './paginas/auth/auth.component';
import { LoginComponent } from './componentes/sesión/login/login.component';
import { ContenedorJuegosComponent } from './paginas/contenedor-juegos/contenedor-juegos.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthenticatedToLogin = () => redirectUnauthorizedTo(['auth']);
export const routes: Routes = [    

    /*
    /IMPORTANTE: Algunas rutas no hacen uso de 'lazy loading', ya que consideré que algunas de las mismas ya deberían estar
    /cargadas para que el usuario pueda interactuar rápidamente con ellas, además de que no son muy pesadas.
    /De cualquier forma, la línea del lazy loading en dichas rutas está comentada, por lo que si es necesario, se puede
    /comentar la carga del componente y habilitar el lazy loading fácilmente.
    */

    {
        path: '',
        component: HomeComponent,        
    },

    {
        path: 'auth',
        loadComponent: () => import('./paginas/auth/auth.component').then((m) => m.AuthComponent),
        //component: AuthComponent,
        children: [
            {
                title: 'Sala de juegos',
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
            {
                title: 'Sala de juegos | Inicio de sesión',
                path: 'login',
                //loadComponent: () => import('./componentes/sesión/login/login.component').then((m) => m.LoginComponent),
                component: LoginComponent,
                canActivate: [AuthGuard],
                data: {authGuardPipe:redirectLoggedInToHome},
            },
            {
                title: 'Sala de juegos | Crear una cuenta',
                path: 'register',
                loadComponent: () => import('./componentes/sesión/register-form/register-form.component').then((m) => m.RegisterFormComponent),
                canActivate: [AuthGuard],
                data: {authGuardPipe:redirectLoggedInToHome},
            }
        ]
    },
    
    {
        path: 'yo',
        loadComponent: () => import('./paginas/sobre-mi/sobre-mi.component').then((m) => m.SobreMiComponent)
    },

    {
        path: 'chat',
        loadComponent: () => import('./paginas/chat/chat.component').then((m) => m.ChatComponent),
        canActivate: [AuthGuard],
        data: {authGuardPipe:redirectUnauthenticatedToLogin},
    },

    {
        path: 'jugar',
        //loadComponent: () => import('./paginas/contenedor-juegos/contenedor-juegos.component').then((m) => m.ContenedorJuegosComponent),
        component: ContenedorJuegosComponent,
        children: [
            {
                title: 'Hora de jugar',
                path: '',
                pathMatch: 'full',
                redirectTo: '/',
            },
            {
                title: 'Juguemos al ahorcado',
                path: 'ahorcado',
                loadComponent: () => import('./componentes/interactivos/juegos/ahorcado/ahorcado.component').then((m) => m.AhorcadoComponent),
                canActivate: [AuthGuard],
                data: {authGuardPipe:redirectUnauthenticatedToLogin},
            },
            {
                title: 'Juguemos a mayor y menor',
                path: 'mayormenor',
                loadComponent: () => import('./componentes/interactivos/juegos/mayor-menor/mayor-menor.component').then((m) => m.MayorMenorComponent),
                canActivate: [AuthGuard],
                data: {authGuardPipe:redirectUnauthenticatedToLogin},
            },
            {
                title: 'Juguemos al respondidos',
                path: 'preguntados',
                loadComponent: () => import('./componentes/interactivos/juegos/preguntados/preguntados.component').then((m) => m.PreguntadosComponent),
                canActivate: [AuthGuard],
                data: {authGuardPipe:redirectUnauthenticatedToLogin},
            },
            {
                title: 'La Ruleta del conurbano',
                path: 'rr',
                loadComponent: () => import('./componentes/interactivos/juegos/RuletaRusa/juego/juego.component').then((m) => m.JuegoComponent),
                canActivate: [AuthGuard],
                data: {authGuardPipe:redirectUnauthenticatedToLogin},
            }
        ]
    },
];
