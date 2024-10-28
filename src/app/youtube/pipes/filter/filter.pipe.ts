import { YouTubeVideo } from '@/shared/types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(movies: YouTubeVideo[] | null, filterText: string | null): YouTubeVideo[] {
    if (!movies) {
      return [];
    }
    if (!filterText) {
      return movies;
    }
    return movies.filter((movie) => movie.snippet.title.toLowerCase().includes(filterText.toLowerCase()));
  }
}
