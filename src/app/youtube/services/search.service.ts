import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeedbackType, YouTubeVideo, YouTubeVideoListResponse } from '@/shared/types';
import * as mockData from './mock/response.json';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly sortOptions: string[] = ['New', 'Popular', 'Old'];

  private originalMovies: YouTubeVideo[] = [];

  private movieList: YouTubeVideo[] = [];

  private moviesSubject: BehaviorSubject<YouTubeVideo[]> = new BehaviorSubject<YouTubeVideo[]>([]);

  private filterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private sortTypeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    this.originalMovies = (mockData as YouTubeVideoListResponse).items;
    this.movieList = JSON.parse(JSON.stringify(this.originalMovies));
    this.moviesSubject.next(this.movieList);
  }

  getMovies(): Observable<YouTubeVideo[]> {
    return this.moviesSubject.asObservable();
  }

  getMovieById(id: string | null): YouTubeVideo | null {
    return this.movieList.find((movie) => movie.id === id) || null;
  }

  getSortOptions(): string[] {
    return this.sortOptions;
  }

  getFilterText(): Observable<string> {
    return this.filterTextSubject.asObservable();
  }

  setFilterText(filterText: string) {
    this.filterTextSubject.next(filterText);
  }

  getSortType(): Observable<string | null> {
    return this.sortTypeSubject.asObservable();
  }

  setSortType(sortType: string | null) {
    this.sortTypeSubject.next(sortType);
  }

  updateFeedback(movie: YouTubeVideo, feedback: FeedbackType) {
    const initialData = this.originalMovies.find((item) => item.id === movie.id);
    const currentData = this.movieList.find((item) => item.id === movie.id);
    if (initialData && currentData) {
      currentData.statistics.likeCount =
        feedback === 'like' ? String(Number(initialData.statistics.likeCount) + 1) : initialData.statistics.likeCount;
      currentData.statistics.dislikeCount =
        feedback === 'dislike'
          ? String(Number(initialData.statistics.dislikeCount) + 1)
          : initialData.statistics.dislikeCount;
      currentData.statistics.feedback = feedback;
    }
    this.moviesSubject.next(this.movieList);
  }
}
