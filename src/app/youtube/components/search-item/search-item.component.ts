import { Feedback, FeedbackActionType, FeedbackType, YouTubeVideo } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { FreshColorDirective } from '../../directives/fresh-color.directive';
import { NumberFormatPipe } from '../../pipes/number-format/number-format.pipe';
import { WindowSizeService } from '../../services/window-size.service';
import { ThumbnailSrcPipe } from '../../pipes/thumbnail-src/thumbnail-src.pipe';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButton,
    NumberFormatPipe,
    FreshColorDirective,
    ThumbnailSrcPipe,
    RouterModule,
    FormsModule,
  ],
  providers: [FreshColorDirective],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent implements OnInit {
  screenWidth$: Observable<number>;

  @Input() movie!: YouTubeVideo;

  @Input() isDetailPage: boolean = false;

  @Output() updateFeedback = new EventEmitter<Feedback>();

  feedback: FeedbackType = null;

  constructor(windowSizeService: WindowSizeService) {
    this.screenWidth$ = windowSizeService.screenWidth$;
  }

  ngOnInit(): void {
    this.feedback = this.movie.statistics?.feedback || null;
  }

  onFeedbackClick(action: FeedbackActionType) {
    this.feedback = this.feedback === action ? null : action;
    this.updateFeedback.emit({ movie: this.movie, feedback: this.feedback });
  }
}
