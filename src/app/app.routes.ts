import { Routes } from '@angular/router';
import { tokenGuard } from './guards/token.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/pages/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [tokenGuard],
    loadChildren: () => import('./dashboard/dashboard.routes')
  }, 
  {
    path: '**',
    redirectTo: '',
  }
];
