import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

const MIN_LENGTH = 3;
const DEBOUNCE_TIME = 300;

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
  formControl = new FormGroup({
    searchText: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchText = params['search'] || '';
      this.formControl.get('searchText')?.setValue(searchText, { emitEvent: false });
    });

    this.formControl
      .get('searchText')
      ?.valueChanges.pipe(
        filter((value): value is string => value !== null && value.length >= MIN_LENGTH),
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
      )
      .subscribe((searchText) => {
        if (searchText) {
          this.updateQueryParams(searchText);
        }
      });
  }

  onSubmit(): void {
    const searchText = this.formControl.get('searchText')?.value;
    this.updateQueryParams(searchText || '');
  }

  private updateQueryParams(searchText: string): void {
    const queryParams = searchText ? { search: searchText } : { search: null };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
