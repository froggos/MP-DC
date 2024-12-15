import { Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.component')
  },
  {
    path: 'tabla-ordenes',
    loadComponent: () => import('./pages/tabla-ordenes/tabla-ordenes.component')
  },
  {
    path: 'tabla-usuarios',
    loadComponent: () => import('./pages/tabla-usuarios/tabla-usuarios.component')
  },
  {
    path: '**',
    redirectTo: 'inicio'

  }
]


export default routes;
