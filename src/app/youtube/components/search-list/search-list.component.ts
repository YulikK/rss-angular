import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { YouTubeVideo } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, SearchItemComponent],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent {
  movies$: Observable<YouTubeVideo[]>;

  constructor(private searchService: SearchService) {
    this.movies$ = searchService.getMovies();
  }
}
