import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'youtube-app-yulik-auth';

  private isLoggedInSubject: BehaviorSubject<boolean>;

  private logger: LoggerService;

  constructor(private router: Router) {
    const isLoggedIn = !!localStorage.getItem(this.tokenKey);
    this.isLoggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.logger = inject(LoggerService);
  }

  login(userName: string, password: string): void {
    const token = `jwt-mock-token-${userName}-${password}`;
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInSubject.next(true);
    this.logger.logMessage('User logged in');
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
