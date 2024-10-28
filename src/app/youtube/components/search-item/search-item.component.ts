import { YouTubeVideo } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
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
    NumberFormatPipe,
    FreshColorDirective,
    ThumbnailSrcPipe,
  ],
  providers: [FreshColorDirective],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent {
  screenWidth$: Observable<number>;

  @Input() movie!: YouTubeVideo;

  constructor(windowSizeService: WindowSizeService) {
    this.screenWidth$ = windowSizeService.screenWidth$;
  }
}
