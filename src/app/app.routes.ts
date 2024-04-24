import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '',  loadComponent: () => import('./paginas/home/home.component').then((m) => m.HomeComponent)},
    {path: 'login',  loadComponent: () => import('./componentes/sesión/login/login.component').then((m) => m.LoginComponent)},
    
];
