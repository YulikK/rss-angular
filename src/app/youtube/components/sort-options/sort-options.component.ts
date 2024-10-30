import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-sort-options',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './sort-options.component.html',
  styleUrls: ['./sort-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortOptionsComponent {
  @Input() sortOptions: string[] = [];

  @Input() currentSortType: string | null = null;

  @Output() sortChange = new EventEmitter<string>();

  onSelectionChange(value: string) {
    this.currentSortType = value;
    this.sortChange.emit(this.currentSortType);
  }
}
