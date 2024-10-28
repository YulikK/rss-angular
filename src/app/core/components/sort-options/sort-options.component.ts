import { SearchService } from '@/app/youtube/services/search.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-sort-options',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './sort-options.component.html',
  styleUrls: ['./sort-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortOptionsComponent {
  readonly sortOptions: string[] = ['New', 'Popular', 'Old'];

  currentSortOption: string | null = null;

  private searchService: SearchService;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  onSelectionChange(event: MatChipListboxChange) {
    this.currentSortOption = event.value;
    this.searchService.sortMovies(this.currentSortOption);
  }
}
