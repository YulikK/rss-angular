import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
})
export class FilterFormComponent {
  filterText: string = '';

  @Output() filterChange = new EventEmitter<string>();

  onSubmit() {
    this.filterChange.emit(this.filterText);
  }
}
