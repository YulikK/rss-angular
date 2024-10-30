import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchListComponent } from '../../components/search-list/search-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
