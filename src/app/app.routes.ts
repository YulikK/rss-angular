import { Routes } from '@angular/router';
import { SearchListComponent } from './youtube/components/search-list/search-list.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { DetailsComponent } from './youtube/pages/details/details.component';

export const routes: Routes = [
  { path: '', component: SearchListComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
