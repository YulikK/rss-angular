import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  isSettingsShow = false;

  @Output() toggleSettingsShowEvent = new EventEmitter<boolean>();

  toggleSettingsShow() {
    this.isSettingsShow = !this.isSettingsShow;
    this.toggleSettingsShowEvent.emit(this.isSettingsShow);
  }
}
