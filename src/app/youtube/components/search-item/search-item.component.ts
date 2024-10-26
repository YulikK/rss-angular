import { NumberFormatPipe } from '@/app/shared/utils/number-format.pipe';
import { YouTubeVideo } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonToggleModule, NumberFormatPipe],
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

  getFreshColor(): string {
    const publishedDate = new Date(this.movie.snippet.publishedAt);
    const currentDate = new Date();
    const diffInDays = Math.floor((currentDate.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays > 180) {
      return 'border-b-red-500';
    }
    if (diffInDays > 30) {
      return 'border-b-yellow-500';
    }
    if (diffInDays > 7) {
      return 'border-b-green-500';
    }
    return 'border-b-blue-500';
  }
}
