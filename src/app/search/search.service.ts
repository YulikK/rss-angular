import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { YouTubeVideo, YouTubeVideoListResponse } from '@/shared/types';
import * as mockData from '../../mock/response.json';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private mockData: YouTubeVideo[] = (mockData as YouTubeVideoListResponse).items;

  getSearchResults(): Observable<YouTubeVideo[]> {
    return of(this.mockData);
  }
}
