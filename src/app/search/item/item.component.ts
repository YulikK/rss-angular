import { NumberFormatPipe } from '@/app/utils/number-format.pipe';
import { YouTubeVideo } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonToggleModule, NumberFormatPipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  screenWidth: number = 0;

  @Input() result!: YouTubeVideo;

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
    let { url } = this.result.snippet.thumbnails.default;
    if (this.screenWidth >= 1280) {
      url = this.result.snippet.thumbnails.maxres?.url ?? url;
    }
    if (this.screenWidth >= 960) {
      url = this.result.snippet.thumbnails.high.url;
    }
    if (this.screenWidth >= 600) {
      url = this.result.snippet.thumbnails.standard?.url ?? url;
    }
    return url;
  }

  getFreshColor(): string {
    const publishedDate = new Date(this.result.snippet.publishedAt);
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
