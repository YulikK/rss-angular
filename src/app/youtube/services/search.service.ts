import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YouTubeVideo, YouTubeVideoListResponse } from '@/shared/types';
import * as mockData from './mock/response.json';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private originalMovies: YouTubeVideo[] = [];

  private moviesSubject: BehaviorSubject<YouTubeVideo[]> = new BehaviorSubject<YouTubeVideo[]>([]);

  constructor() {
    this.originalMovies = (mockData as YouTubeVideoListResponse).items;
    this.moviesSubject.next(this.originalMovies);
  }

  getMovies(): Observable<YouTubeVideo[]> {
    return this.moviesSubject.asObservable();
  }

  filterMovies(filterText: string) {
    const filteredMovies = this.originalMovies.filter((movie) =>
      movie.snippet.title.toLowerCase().includes(filterText.toLowerCase()),
    );
    this.moviesSubject.next(filteredMovies);
  }

  sortMovies(sortType: string | null) {
    const sortedMovies = [...this.originalMovies];
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
    this.moviesSubject.next(sortedMovies);
  }
}
