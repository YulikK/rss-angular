import { FeedbackType, YouTubeVideo } from '@/shared/types';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { SearchItemComponent } from '../../components/search-item/search-item.component';
import { FindByIdPipe } from '../../pipes/findById/find-by-id.pipe';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, RouterModule, MatButtonModule, FindByIdPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  movies$: Observable<YouTubeVideo[]>;

  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
  ) {
    this.movies$ = searchService.getMovies();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.searchService.searchMovies('', this.id || '');
  }

  onUpdateFeedback(event: { movie: YouTubeVideo; feedback: FeedbackType }) {
    this.searchService.updateFeedback(event.movie, event.feedback);
  }
}
