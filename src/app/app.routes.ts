import { Routes } from '@angular/router';
import { ROUTES } from '@/shared/constant';
import { SearchListComponent } from './youtube/components/search-list/search-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: ROUTES.EMPTY, pathMatch: 'full', redirectTo: ROUTES.HOME },
  { path: ROUTES.HOME, title: ROUTES.HOME, component: SearchListComponent, canActivate: [authGuard] },
  {
    path: ROUTES.DETAILS,
    title: ROUTES.DETAILS,
    loadComponent: () => import('./youtube/pages/details/details.component').then((m) => m.DetailsComponent),
    canActivate: [authGuard],
  },
  {
    path: ROUTES.LOGIN,
    title: ROUTES.LOGIN,
    loadComponent: () => import('./core/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: ROUTES.NOT_FOUND,
    title: ROUTES.NOT_FOUND,
    loadComponent: () => import('./core/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },

  { path: ROUTES.NO_MATCH, redirectTo: ROUTES.NOT_FOUND },
];
