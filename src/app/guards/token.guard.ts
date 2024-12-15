import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { inject } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

export const tokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  return inject(LoginService).autenticado().pipe(
    map(value => {
      if (!value) {
        router.navigate(['']);
      }

      return value;
    }),
    catchError(() => {
      router.navigate(['']);

      return [false];
    })
  );
};
