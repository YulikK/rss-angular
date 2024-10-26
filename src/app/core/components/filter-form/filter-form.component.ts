import { SearchService } from '@/app/youtube/services/search.service';
import { Component } from '@angular/core';
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

  private searchService: SearchService;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  onSubmit() {
    this.searchService.filterMovies(this.filterText);
  }
}
