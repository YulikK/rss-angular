import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { YouTubeVideo, YouTubeVideoListResponse } from '@/shared/types';
import * as mockData from './mock/response.json';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly sortOptions: string[] = ['New', 'Popular', 'Old'];

  private originalMovies: YouTubeVideo[] = [];

  private moviesSubject: BehaviorSubject<YouTubeVideo[]> = new BehaviorSubject<YouTubeVideo[]>([]);

  private filterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private sortTypeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    this.originalMovies = (mockData as YouTubeVideoListResponse).items;
    this.moviesSubject.next(this.originalMovies);
  }

  getMovies(): Observable<YouTubeVideo[]> {
    return this.moviesSubject.asObservable();
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
}
