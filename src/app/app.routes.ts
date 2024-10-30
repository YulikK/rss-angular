import { Routes } from '@angular/router';
import { SearchListComponent } from './youtube/components/search-list/search-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', title: 'home', component: SearchListComponent, canActivate: [authGuard] },
  {
    path: 'details/:id',
    title: 'details',
    loadComponent: () => import('./youtube/pages/details/details.component').then((m) => m.DetailsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('./core/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'not-found',
    title: '404',
    loadComponent: () => import('./core/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  { path: '**', redirectTo: '/not-found' },
];
