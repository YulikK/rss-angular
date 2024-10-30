import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName: string = '';

  password: string = '';

  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  onSubmit(): void {
    this.authService.login(this.userName, this.password);
  }
}
