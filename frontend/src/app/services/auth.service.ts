import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'icc_token';
  isLoggedIn = signal(!!localStorage.getItem(this.KEY));

  setToken(token: string) {
    localStorage.setItem(this.KEY, token);
    this.isLoggedIn.set(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.KEY);
  }

  logout() {
    localStorage.removeItem(this.KEY);
    this.isLoggedIn.set(false);
  }
}
