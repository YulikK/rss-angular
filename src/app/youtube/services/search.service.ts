import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import {
  FeedbackType,
  YouTubeChannelResponse,
  YouTubeVideo,
  YouTubeVideoDetailResponse,
  YouTubeVideoListResponse,
} from '@/shared/types';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  private searchTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  searchMovies(searchText: string): void {
    this.searchVideos(searchText)
      .pipe(
        switchMap((videos) => this.getVideoDetails(videos)),
        switchMap((videosWithDetails) => this.getChannelInfo(videosWithDetails)),
      )
      .subscribe((movies) => {
        this.originalMovies = movies;
        this.movieList = JSON.parse(JSON.stringify(this.originalMovies));
        this.moviesSubject.next(this.movieList);
      });
  }

  private searchVideos(searchText: string): Observable<YouTubeVideo[]> {
    const params = new HttpParams()
      .set('type', 'video')
      .set(searchText ? 'q' : 'chart', searchText || 'mostPopular')
      .set('part', 'snippet')
      .set('maxResults', '3');

    return this.http.get<YouTubeVideoListResponse>('search', { params }).pipe(map((response) => response.items));
  }

  private getVideoDetails(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
    const videoIds = videos.map((video) => video.id.videoId).join(',');
    const params = new HttpParams().set('part', 'snippet,statistics').set('id', videoIds);

    return this.http.get<YouTubeVideoDetailResponse>('videos', { params }).pipe(
      map((detailsResponse) =>
        detailsResponse.items.map((detail) => {
          const video = videos.find((v) => v.id.videoId === detail.id);
          if (video) {
            return {
              ...video,
              statistics: {
                ...detail.statistics,
                viewCount: detail.statistics.viewCount || '0',
              },
            };
          }
          return {
            ...detail,
            id: {
              kind: detail.kind,
              videoId: detail.id,
            },
          };
        }),
      ),
    );
  }

  private getChannelInfo(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
    const channelIds = videos.map((video) => video.snippet.channelId).join(',');
    const params = new HttpParams().set('part', 'snippet').set('id', channelIds);

    return this.http.get<YouTubeChannelResponse>('channels', { params }).pipe(
      map((channelResponse) =>
        videos.map((video) => {
          const channel = channelResponse.items.find((c) => c.id === video.snippet.channelId);
          return { ...video, channelInfo: channel };
        }),
      ),
    );
  }

  getMovies(): Observable<YouTubeVideo[]> {
    return this.moviesSubject.asObservable();
  }

  getMovieById(id: string | null): YouTubeVideo | null {
    return this.movieList.find((movie) => movie.id.videoId === id) || null;
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

  getSearchText(): Observable<string> {
    return this.searchTextSubject.asObservable();
  }

  setSearchText(searchText: string) {
    this.searchTextSubject.next(searchText);
    this.searchMovies(searchText);
  }

  updateFeedback(movie: YouTubeVideo, feedback: FeedbackType) {
    const initialData = this.originalMovies.find((item) => item.id === movie.id);
    const currentData = this.movieList.find((item) => item.id === movie.id);
    if (initialData && currentData && initialData.statistics && currentData.statistics) {
      currentData.statistics.likeCount =
        feedback === 'like' ? String(Number(initialData.statistics.likeCount) + 1) : initialData.statistics.likeCount;
      currentData.statistics.feedback = feedback;
    }
    this.moviesSubject.next(this.movieList);
  }
}
