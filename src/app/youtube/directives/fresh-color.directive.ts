import { YouTubeVideo } from '@/shared/types';
import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFreshColor]',
  standalone: true,
})
export class FreshColorDirective implements AfterViewInit {
  @Input('appFreshColor') movie?: YouTubeVideo;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.setBorderColor();
  }

  private setBorderColor() {
    if (!this.el.nativeElement) {
      return;
    }
    let borderColor = '#449aef';

    if (this.movie) {
      const publishedDate = new Date(this.movie.snippet.publishedAt);
      const currentDate = new Date();
      const diffInDays = Math.floor((currentDate.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffInDays > 180) {
        borderColor = '#ef4444';
      } else if (diffInDays > 30) {
        borderColor = '#efdb44';
      } else if (diffInDays > 7) {
        borderColor = '#22c55e';
      }
    }

    this.renderer.setStyle(this.el.nativeElement, 'borderBottomColor', borderColor);
  }
}
