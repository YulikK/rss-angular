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
    isMainPage: true,
    isReady: false,
  });

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const navigationParams = this.makeNavigationParams();

      if (navigationParams.isMainPage && navigationParams.searchText) {
        this.searchTextSubject.next(navigationParams.searchText);
      }

      this.navigationSubject.next(navigationParams);
    });
  }

  makeNavigationParams(): NavigationServiceType {
    const { url } = this.router;
    const urlSegments = url.split('/');
    const id = urlSegments[urlSegments.length - 1];
    const queryParams = new URLSearchParams(window.location.search);
    const searchText = queryParams.get('search') || '';
    const isMainPage = url.includes(`${ROUTES.HOME}`);

    return {
      searchText,
      id: url.includes('/details/') && id ? id : null,
      isMainPage,
      isReady: url !== '/',
    };
  }

  getNavigation(): Observable<NavigationServiceType> {
    return this.navigationSubject.asObservable();
  }

  getSearchText(): Observable<string> {
    return this.searchTextSubject.asObservable();
  }
}
