import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const sessionGuard: CanActivateFn = (route, state) => {
  const session = localStorage.getItem('token');
  if(!session) return inject(Router).createUrlTree(['/login']);
  return true;
};
