import { YouTubeVideo } from '@/shared/types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(movies: YouTubeVideo[] | null, sortType: string | null): YouTubeVideo[] {
    if (!movies || !sortType) {
      return movies || [];
    }
    const sortedMovies = [...movies];
    if (sortType === 'New') {
      sortedMovies.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime(),
      );
    } else if (sortType === 'Popular') {
      sortedMovies.sort((a, b) => parseInt(b.statistics.viewCount, 10) - parseInt(a.statistics.viewCount, 10));
    } else if (sortType === 'Old') {
      sortedMovies.sort(
        (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime(),
      );
    }
    return sortedMovies;
  }
}
