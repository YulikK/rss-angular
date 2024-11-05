import { YouTubeVideo } from '@/shared/types';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findById',
  standalone: true,
})
export class FindByIdPipe implements PipeTransform {
  transform(movies: YouTubeVideo[] | null, id: string | null): YouTubeVideo | null {
    if (!movies) {
      return null;
    }
    if (id) {
      return movies.find((movie) => movie.id === id) || null;
    }
    return null;
  }
}
