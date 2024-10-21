import { Component } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-sort-options',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './sort-options.component.html',
  styleUrl: './sort-options.component.scss',
})
export class SortOptionsComponent {
  readonly sortOptions: string[] = ['New', 'Popular', 'Old'];

  currentSortOption: string | null = null;

  onSelectionChange(event: MatChipListboxChange) {
    this.currentSortOption = event.value;
    console.log(`Sorting by ${this.currentSortOption} order`);
  }
}
