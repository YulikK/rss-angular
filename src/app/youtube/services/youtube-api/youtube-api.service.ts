import {
  YouTubeChannelResponse,
  YouTubeVideo,
  YouTubeVideoDetailsResponse,
  YouTubeVideoListResponse,
} from '@/shared/types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

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
export class YoutubeApiService {
  constructor(private http: HttpClient) {}

  getMovies(value: string, isId: boolean = false): Observable<YouTubeVideo[]> {
    if (isId) {
      return this.getMovieById(value).pipe(switchMap((videosWithDetails) => this.getChannelInfo(videosWithDetails)));
    }

    return this.getMovieByQuery(value).pipe(
      switchMap((videoList) => this.getVideoDetails(videoList)),
      switchMap((videosWithDetails) => this.getChannelInfo(videosWithDetails)),
    );
  }

  getMovieById(value: string): Observable<YouTubeVideo[]> {
    const params = this.makeParams(value, true, `${PART_VIDEO},${PART_STATISTICS}`);

    return this.http.get<YouTubeVideoDetailsResponse>(API_URL.videos, { params }).pipe(
      map((response) =>
        response.items.map((item) => ({
          ...item,
        })),
      ),
    );
  }

  getMovieByQuery(value: string): Observable<YouTubeVideo[]> {
    const params = this.makeParams(value, false, PART_VIDEO);

    return this.http.get<YouTubeVideoListResponse>(API_URL.search, { params }).pipe(
      map((response) =>
        response.items.map((item) => ({
          ...item,
          id: typeof item.id === 'object' ? item.id.videoId : item.id,
        })),
      ),
    );
  }

  makeParams(value: string, isId: boolean, part: string): HttpParams {
    let params = new HttpParams().set('type', 'video').set('part', part);

    if (isId) {
      params = params.set('id', value);
    } else if (value) {
      params = params.set('q', value);
    } else {
      params = params.set('chart', CHART);
    }

    if (!isId) {
      params = params.set('maxResults', MAX_RESULTS);
    }

    return params;
  }

  getVideoDetails(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
    const videoIds = videos.map((video) => video.id).join(',');
    const params = this.makeParams(videoIds, true, `${PART_VIDEO},${PART_STATISTICS}`);

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

  getChannelInfo(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
    const channelIds = videos.map((video) => video.snippet.channelId).join(',');
    const params = this.makeParams(channelIds, true, PART_VIDEO);

    return this.http.get<YouTubeChannelResponse>(API_URL.channels, { params }).pipe(
      map((channelResponse) =>
        videos.map((video) => {
          const channel = channelResponse.items.find((c) => c.id === video.snippet.channelId);
          return { ...video, channelInfo: channel };
        }),
      ),
    );
  }
}
