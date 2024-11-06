import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, Observable, of, switchMap } from 'rxjs';
import { FeedbackType, YouTubeVideo } from '@/shared/types';
import { NavigationService } from '@/app/core/services/navigation/navigation.service';
import { YoutubeApiService } from './youtube-api/youtube-api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly sortOptions: string[] = ['New', 'Popular', 'Old'];

  private moviesSubject: BehaviorSubject<YouTubeVideo[]> = new BehaviorSubject<YouTubeVideo[]>([]);

  private filterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private sortTypeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private youtubeApiService: YoutubeApiService,
    private navigationService: NavigationService,
  ) {
    this.navigationService.getNavigation().subscribe((navigation) => {
      if (navigation.isMainPage) {
        this.searchMovies(navigation.searchText);
      } else if (navigation.id) {
        this.searchMovies(navigation.id, true);
      }
    });
  }

  searchMovies(value: string, isId: boolean = false): void {
    this.youtubeApiService
      .searchVideos(value, isId)
      .pipe(
        switchMap((videos) => iif(() => !isId, this.youtubeApiService.getVideoDetails(videos), of(videos))),
        switchMap((videosWithDetails) => this.youtubeApiService.getChannelInfo(videosWithDetails)),
      )
      .subscribe((movies) => {
        this.moviesSubject.next(movies);
      });
  }

  getMovies(): Observable<YouTubeVideo[]> {
    return this.moviesSubject.asObservable();
  }

  getMovieById(id: string | null): YouTubeVideo | null {
    return this.moviesSubject.value.find((movie) => movie.id === id) || null;
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
    console.log('movie', movie, feedback);
  }
}
