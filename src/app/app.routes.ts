import { Routes } from '@angular/router';
import { SearchListComponent } from './youtube/components/search-list/search-list.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: SearchListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];
