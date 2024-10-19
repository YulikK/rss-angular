import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, SearchFormComponent, SettingsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
