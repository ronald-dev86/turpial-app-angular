import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { sessionGuard } from './guard/session/session.guard';
import { forceDashboardGuard } from './guard/session/force-dashboard.guard';

export const routes: Routes = [
    { path: 'login', loadComponent:() => import('./pages/login/login.component').then(m => m.LoginComponent), canActivate:[forceDashboardGuard] },
    { path: 'dashboard',  loadComponent:() => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [sessionGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
