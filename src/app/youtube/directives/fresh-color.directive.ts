import { YouTubeVideo } from '@/shared/types';
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFreshColor]',
  standalone: true,
})
export class FreshColorDirective implements AfterViewInit {
  @Input('appFreshColor') movie?: YouTubeVideo;

  private element: ElementRef;

  constructor(private el: ElementRef) {
    this.element = el;
  }

  ngAfterViewInit(): void {
    this.setBorderColor(this.element);
  }

  private setBorderColor(el: ElementRef) {
    if (!el.nativeElement) {
      return;
    }
    let borderColor = 'border-b-blue-500';

    if (this.movie) {
      const publishedDate = new Date(this.movie.snippet.publishedAt);
      const currentDate = new Date();
      const diffInDays = Math.floor((currentDate.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffInDays > 180) {
        borderColor = 'border-b-red-500';
      } else if (diffInDays > 30) {
        borderColor = 'border-b-yellow-500';
      } else if (diffInDays > 7) {
        borderColor = 'border-b-green-500';
      }
    }

    el.nativeElement.classList.add(borderColor);
  }
}
