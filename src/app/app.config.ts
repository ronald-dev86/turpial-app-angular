import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAngularSvgIcon }  from  'angular-svg-icon' ;

import { routes } from './app.routes';
import { injectTokenInterceptor } from './core/interceptor/inject-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([injectTokenInterceptor])),
    provideAngularSvgIcon() 
  ]
};
