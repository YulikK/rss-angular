import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LogoComponent } from './logo/logo.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SettingsComponent } from './settings/settings.component';
import { SortOptionsComponent } from './sort-options/sort-options.component';
import { FilterFormComponent } from './filter-form/filter-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, SearchFormComponent, SettingsComponent, SortOptionsComponent, FilterFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
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
  isSettingsShow = false;

  @Output() sortChange = new EventEmitter<string | null>();

  @Output() filterChange = new EventEmitter<string>();

  toggleSettingsShow(isSettingsShow: boolean) {
    this.isSettingsShow = isSettingsShow;
  }

  onFilterChange(filterText: string) {
    this.filterChange.emit(filterText);
  }

  onSortChange(sortOption: string | null) {
    this.sortChange.emit(sortOption);
  }
}
