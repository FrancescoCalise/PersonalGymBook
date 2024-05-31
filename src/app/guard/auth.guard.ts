import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await firstValueFrom(authService.user$.pipe(
      take(1) // Prendo il primo valore disponibile
    ));
    if (user) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  } catch (error) {
    return router.createUrlTree(['/login']);
  }
};
