import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const forceDashboardGuard: CanActivateFn = (route, state) => {
  const session = localStorage.getItem('token');
  if(session) return inject(Router).createUrlTree(['/dashboard']);
  return true;
};
