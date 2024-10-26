import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  searchText: string = '';

  onSubmit() {
    console.log('Search text:', this.searchText);
  }
}
