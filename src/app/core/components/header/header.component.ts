import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SearchService } from '@/app/youtube/services/search.service';
import { SearchFormComponent } from '@/app/youtube/components/search-form/search-form.component';
import { SortOptionsComponent } from '@/app/youtube/components/sort-options/sort-options.component';
import { FilterFormComponent } from '@/app/youtube/components/filter-form/filter-form.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchFormComponent, SettingsComponent, SortOptionsComponent, FilterFormComponent],
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
export class HeaderComponent {
  private searchService: SearchService;

  isSettingsShow = false;

  sortOptions: string[];

  constructor(searchService: SearchService) {
    this.searchService = searchService;
    this.sortOptions = this.searchService.getSortOptions();
  }

  onSortChange(value: string) {
    this.searchService.setSortType(value);
  }

  onFilterChange(value: string) {
    this.searchService.setFilterText(value);
  }

  toggleSettingsShow(isSettingsShow: boolean) {
    this.isSettingsShow = isSettingsShow;
  }
}
