import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YouTubeVideo } from '@/shared/types';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search/search.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'youtube-app';

  sortType: string | null = null;

  filterText: string = '';

  searchResults: YouTubeVideo[] = [];

  videoList: YouTubeVideo[] = [];

  private searchService: SearchService = new SearchService();

  ngOnInit(): void {
    this.searchService.getSearchResults().subscribe((results) => {
      this.searchResults = results;
      this.videoList = results;
    });
  }

  onSortChange(sortOption: string | null) {
    this.sortType = sortOption;
    this.updateVideoList();
  }

  onFilterChange(filterText: string) {
    this.filterText = filterText;
    this.updateVideoList();
  }

  updateVideoList() {
    this.videoList = [...this.searchResults];
    this.makeFilter();
    this.makeSort();
  }

  makeSort() {
    if (!this.sortType) {
      return;
    }
    if (this.sortType === 'New') {
      this.videoList.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime(),
      );
    } else if (this.sortType === 'Popular') {
      this.videoList.sort((a, b) => parseInt(b.statistics.viewCount, 10) - parseInt(a.statistics.viewCount, 10));
    } else if (this.sortType === 'Old') {
      this.videoList.sort(
        (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime(),
      );
    }
  }

  makeFilter() {
    if (this.filterText) {
      this.videoList = this.videoList.filter((video) =>
        video.snippet.title.toLowerCase().includes(this.filterText.toLowerCase()),
      );
    }
  }
}
