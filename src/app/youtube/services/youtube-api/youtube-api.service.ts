import {
  YouTubeChannelResponse,
  YouTubeVideo,
  YouTubeVideoDetailsResponse,
  YouTubeVideoListResponse,
} from '@/shared/types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

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

  searchVideos(value: string, isId?: boolean): Observable<YouTubeVideo[]> {
    const params = this.makeParams(value, isId);

    return this.http.get<YouTubeVideoListResponse>(isId ? API_URL.videos : API_URL.search, { params }).pipe(
      map((response) =>
        response.items.map((item) => ({
          ...item,
          id: typeof item.id === 'object' ? item.id.videoId : item.id,
        })),
      ),
    );
  }

  makeParams(value: string, isId?: boolean): HttpParams {
    let params = new HttpParams().set('type', 'video').set('part', PART_VIDEO).set('maxResults', MAX_RESULTS);

    if (isId) {
      params = params.set('id', value);
    } else if (value) {
      params = params.set('q', value);
    } else {
      params = params.set('chart', CHART);
    }

    return params;
  }

  getVideoDetails(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
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

  getChannelInfo(videos: YouTubeVideo[]): Observable<YouTubeVideo[]> {
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
}
