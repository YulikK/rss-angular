import { FeedbackType, YouTubeVideo } from '@/shared/types';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SearchService } from '../../services/search.service';
import { SearchItemComponent } from '../../components/search-item/search-item.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SearchItemComponent, RouterModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  movie?: YouTubeVideo | null;

  private route: ActivatedRoute;

  private searchService: SearchService;

  constructor(route: ActivatedRoute, searchService: SearchService) {
    this.route = route;
    this.searchService = searchService;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movie = this.searchService.getMovieById(id);
  }

  onUpdateFeedback(event: { movie: YouTubeVideo; feedback: FeedbackType }) {
    this.searchService.updateFeedback(event.movie, event.feedback);
  }
}
