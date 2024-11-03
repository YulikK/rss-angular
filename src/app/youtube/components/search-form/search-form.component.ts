import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFormComponent implements OnInit {
  searchControl = new FormControl('');

  @Input() searchText: string = '';

  @Output() searchChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((value): value is string => value !== null && value.length >= 3),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((searchText) => {
        this.searchChange.emit(searchText);
      });
  }
}
