import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    let isLogged = authService.isAuthLoginCompleted();
    if (isLogged) { return true; }
    else {
      return router.createUrlTree(['/login']);
    }
  } catch (error) {
    return router.createUrlTree(['/login']);
  }
};
