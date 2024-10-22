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

  searchResults: YouTubeVideo[] = [];

  sortedData: YouTubeVideo[] = [];

  private searchService: SearchService = new SearchService();

  ngOnInit(): void {
    this.searchService.getSearchResults().subscribe((results) => {
      this.searchResults = results;
      this.sortedData = results;
    });
  }

  onSortChange(sortOption: string | null) {
    if (sortOption === 'New') {
      this.sortedData.sort(
        (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime(),
      );
    } else if (sortOption === 'Popular') {
      this.sortedData.sort((a, b) => parseInt(b.statistics.viewCount, 10) - parseInt(a.statistics.viewCount, 10));
    } else if (sortOption === 'Old') {
      this.sortedData.sort(
        (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime(),
      );
    } else {
      this.sortedData = [...this.searchResults];
    }
  }
}
