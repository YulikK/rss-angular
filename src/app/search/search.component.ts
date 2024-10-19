import { YouTubeVideo } from '@/shared/types';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './search.service';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ItemComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchResults: YouTubeVideo[] = [];

  private searchService: SearchService = new SearchService();

  ngOnInit(): void {
    this.searchService.getSearchResults().subscribe((results) => {
      this.searchResults = results;
    });
  }
}
