import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '',  loadComponent: () => import('./paginas/home/home.component').then((m) => m.HomeComponent)},
    {path: 'login',  loadComponent: () => import('./componentes/sesión/login/login.component').then((m) => m.LoginComponent)},
    {path: 'yo',  loadComponent: () => import('./paginas/sobre-mi/sobre-mi.component').then((m) => m.SobreMiComponent)},
];
