import { Injectable } from '@angular/core';
import { BehaviorSubject, iif, map, Observable, of, switchMap, tap } from 'rxjs';
import {
  FeedbackType,
  YouTubeChannelResponse,
  YouTubeVideo,
  YouTubeVideoDetailsResponse,
  YouTubeVideoListResponse,
} from '@/shared/types';
import { HttpClient, HttpParams } from '@angular/common/http';

const MAX_RESULTS = '3';
const CHART = 'mostPopular';
const PART_VIDEO = 'snippet';
const PART_STATISTICS = 'statistics';
const API_URL = {
  search: 'search',
  videos: 'videos',
  channels: 'channels',
};
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

  private isDataLoaded = false;

  constructor(http: HttpClient) {
    this.http = http;
  }

  searchMovies(searchText?: string, id?: string): void {
    if (this.isDataLoaded && !searchText && !id) {
      this.moviesSubject.next(this.movieList);
      return;
    }

    if (id && this.movieList.some((movie) => movie.id === id)) {
      this.moviesSubject.next(this.movieList);
      return;
    }

    this.searchVideos(searchText, id)
      .pipe(
        switchMap((videos) => iif(() => !id, this.getVideoDetails(videos), of(videos))),
        switchMap((videosWithDetails) => this.getChannelInfo(videosWithDetails)),
        tap((movies) => {
          this.originalMovies = movies;
          this.movieList = JSON.parse(JSON.stringify(this.originalMovies));
          this.isDataLoaded = true;
        }),
      )
      .subscribe((movies) => {
        this.moviesSubject.next(this.movieList);
      });
  }

  private searchVideos(searchText?: string, id?: string): Observable<YouTubeVideo[]> {
    let params = new HttpParams().set('type', 'video').set('part', PART_VIDEO).set('maxResults', MAX_RESULTS);

    if (id) {
      params = params.set('id', id);
    } else if (searchText) {
      params = params.set('q', searchText);
    } else {
      params = params.set('chart', CHART);
    }

    return this.http.get<YouTubeVideoListResponse>(id ? API_URL.videos : API_URL.search, { params }).pipe(
      map((response) =>
        response.items.map((item) => ({
          ...item,
          id: typeof item.id === 'object' ? item.id.videoId : item.id,
        })),
      ),
    );
  }

  private getVideoDetails(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
    const videoIds = videos.map((video) => video.id).join(',');
    const params = new HttpParams().set('part', `${PART_VIDEO},${PART_STATISTICS}`).set('id', videoIds);

    return this.http.get<YouTubeVideoDetailsResponse>(API_URL.videos, { params }).pipe(
      map((detailsResponse) =>
        detailsResponse.items.map((detail) => {
          const video = videos.find((v) => v.id === detail.id);
          if (video) {
            return {
              ...video,
              statistics: {
                ...detail.statistics,
              },
            };
          }
          return {
            ...detail,
            id: detail.id,
          };
        }),
      ),
    );
  }

  private getChannelInfo(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
    const channelIds = videos.map((video) => video.snippet.channelId).join(',');
    const params = new HttpParams().set('part', PART_VIDEO).set('id', channelIds);

    return this.http.get<YouTubeChannelResponse>(API_URL.channels, { params }).pipe(
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
