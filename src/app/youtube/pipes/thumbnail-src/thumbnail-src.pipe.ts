import { YouTubeVideo } from '@/shared/types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnailSrc',
  standalone: true,
})
export class ThumbnailSrcPipe implements PipeTransform {
  transform(movie: YouTubeVideo, screenWidth: number | null): string {
    const { url } = movie.snippet.thumbnails.medium || movie.snippet.thumbnails.default;
    if (!screenWidth) {
      return url;
    }
    if (screenWidth >= 1280) {
      return movie.snippet.thumbnails.maxres?.url ?? url;
    }
    if (screenWidth >= 960) {
      return movie.snippet.thumbnails.standard?.url ?? url;
    }
    if (screenWidth >= 600) {
      return movie.snippet.thumbnails.high.url;
    }
    return url;
  }
}
