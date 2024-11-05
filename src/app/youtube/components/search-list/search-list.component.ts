import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackType, YouTubeVideo } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchService } from '../../services/search.service';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { SortPipe } from '../../pipes/sort/sort.pipe';
import { NoResultsComponent } from '../no-results/no-results.component';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, FilterPipe, SortPipe, NoResultsComponent],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent implements OnInit {
  movies$: Observable<YouTubeVideo[]>;

  filterText$: Observable<string>;

  sortType$: Observable<string | null>;

  constructor(private searchService: SearchService) {
    this.movies$ = searchService.getMovies();
    this.filterText$ = searchService.getFilterText();
    this.sortType$ = searchService.getSortType();
  }

  ngOnInit(): void {
    this.searchService.searchMovies('');
  }

  onUpdateFeedback(event: { movie: YouTubeVideo; feedback: FeedbackType }) {
    this.searchService.updateFeedback(event.movie, event.feedback);
  }
}
