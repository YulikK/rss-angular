import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SearchService } from '@/app/youtube/services/search.service';
import { SearchFormComponent } from '@/app/youtube/components/search-form/search-form.component';
import { SortOptionsComponent } from '@/app/youtube/components/sort-options/sort-options.component';
import { FilterFormComponent } from '@/app/youtube/components/filter-form/filter-form.component';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ROUTES } from '@/shared/constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SearchFormComponent,
    SortOptionsComponent,
    FilterFormComponent,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleSettingsShow', [
      state(
        'void',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        }),
      ),
      state(
        '*',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        }),
      ),
      transition('void <=> *', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  isSettingsShow = false;

  isLoggedIn$!: Observable<boolean>;

  sortOptions: string[];

  currentSortType$: Observable<string | null>;

  filterText$: Observable<string>;

  searchText$: Observable<string>;

  isHomeRoute$!: Observable<boolean>;

  readonly homePage = `/${ROUTES.HOME}`;

  constructor(
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.sortOptions = this.searchService.getSortOptions();
    this.isLoggedIn$ = this.authService.getIsLoggedIn();
    this.currentSortType$ = this.searchService.getSortType();
    this.filterText$ = this.searchService.getFilterText();
    this.searchText$ = this.searchService.getSearchText();
  }

  ngOnInit(): void {
    this.isHomeRoute$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects === this.homePage),
    );
  }

  onSortChange(value: string) {
    this.searchService.setSortType(value);
  }

  onFilterChange(value: string) {
    this.searchService.setFilterText(value);
  }

  onSearchChange(value: string) {
    this.searchService.setSearchText(value);
  }

  toggleSettingsShow() {
    this.isSettingsShow = !this.isSettingsShow;
  }

  logout(): void {
    this.authService.logout();
  }
}
