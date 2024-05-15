import { Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './paginas/home/home.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthenticatedToLogin = () => redirectUnauthorizedTo(['auth']);
export const routes: Routes = [    

    {
        path: '',
        //loadComponent: () => import('./paginas/home/home.component').then((m) => m.HomeComponent),
        component: HomeComponent,        
    },

    {
        path: 'auth',
        loadComponent: () => import('./paginas/auth/auth.component').then((m) => m.AuthComponent),
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
                loadComponent: () => import('./componentes/sesión/login/login.component').then((m) => m.LoginComponent),
                canActivate: [AuthGuard],
                data: {authGuardPipe:redirectLoggedInToHome},
            },
            {
                title: 'Sala de juegos | Crear una cuenta',
                path: 'register',
                loadComponent: () => import('./componentes/sesión//register-form/register-form.component').then((m) => m.RegisterFormComponent),
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
];
