import { Routes } from '@angular/router';
import { SearchListComponent } from './youtube/components/search-list/search-list.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { DetailsComponent } from './youtube/pages/details/details.component';
import { LoginComponent } from './core/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: SearchListComponent, canActivate: [authGuard] },
  { path: 'details/:id', component: DetailsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
