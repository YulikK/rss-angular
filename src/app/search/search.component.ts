import { YouTubeVideo } from '@/shared/types';
import { Component, Input } from '@angular/core';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() searchResults: YouTubeVideo[] = [];
}
