import { ROUTES } from '@/shared/constant';
import { NavigationServiceType } from '@/shared/types';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private searchTextSubject = new BehaviorSubject<string>('');

  private navigationSubject = new BehaviorSubject<NavigationServiceType>({
    searchText: '',
    id: null,
    isMainPage: false,
  });

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const { url } = this.router;

      const urlSegments = url.split('/');
      const id = urlSegments[urlSegments.length - 1];
      const queryParams = new URLSearchParams(window.location.search);
      const searchText = queryParams.get('search') || '';
      if (url.includes(`${ROUTES.HOME}`)) {
        this.searchTextSubject.next(searchText);
      }

      this.navigationSubject.next({
        searchText,
        id: url.includes('/details/') && id ? id : null,
        isMainPage: url.includes(`${ROUTES.HOME}`),
      });
    });
  }

  getNavigation(): Observable<NavigationServiceType> {
    return this.navigationSubject.asObservable();
  }

  getSearchText(): Observable<string> {
    return this.searchTextSubject.asObservable();
  }
}
