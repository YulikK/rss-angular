import { YouTubeVideo } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { FreshColorDirective } from '../../directives/fresh-color.directive';
import { NumberFormatPipe } from '../../pipes/number-format/number-format.pipe';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonToggleModule, NumberFormatPipe, FreshColorDirective],
  providers: [FreshColorDirective],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent implements OnInit {
  screenWidth: number = 0;

  @Input() movie!: YouTubeVideo;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (event.target instanceof Window) {
      this.screenWidth = event.target.innerWidth;
    }
  }

  getThumbnailUrl(): string {
    let { url } = this.movie.snippet.thumbnails.default;
    if (this.screenWidth >= 1280) {
      url = this.movie.snippet.thumbnails.maxres?.url ?? url;
    }
    if (this.screenWidth >= 960) {
      url = this.movie.snippet.thumbnails.high.url;
    }
    if (this.screenWidth >= 600) {
      url = this.movie.snippet.thumbnails.standard?.url ?? url;
    }
    return url;
  }
}
