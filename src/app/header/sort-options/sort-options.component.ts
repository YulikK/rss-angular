import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-sort-options',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './sort-options.component.html',
  styleUrls: ['./sort-options.component.scss'],
})
export class SortOptionsComponent {
  readonly sortOptions: string[] = ['New', 'Popular', 'Old'];

  currentSortOption: string | null = null;

  @Output() sortChange = new EventEmitter<string | null>();

  onSelectionChange(event: MatChipListboxChange) {
    this.currentSortOption = event.value;
    this.sortChange.emit(this.currentSortOption);
  }
}
