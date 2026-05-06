import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">⚙ ICC Admin</div>
        <h2>Connexion</h2>
        @if (error()) { <div class="form-error" style="margin-bottom:16px">{{ error() }}</div> }
        <form (ngSubmit)="login()">
          <div class="form-group">
            <label>Email</label>
            <input class="form-control" type="email" [(ngModel)]="email" name="email" required autofocus>
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input class="form-control" type="password" [(ngModel)]="password" name="password" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%" [disabled]="loading()">
            {{ loading() ? 'Connexion…' : 'Se connecter' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--dark); }
    .login-card { background: var(--white); border-radius: var(--radius-lg); padding: 40px; width: 100%; max-width: 380px; box-shadow: var(--shadow-md); }
    .login-logo { font-family: var(--font-display); font-size: 1.2rem; color: var(--green); margin-bottom: 8px; }
    h2 { margin-bottom: 28px; }
  `]
})
export class LoginComponent {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  email = ''; password = '';
  loading = signal(false);
  error = signal('');

  login() {
    this.loading.set(true); this.error.set('');
    this.api.login(this.email, this.password).subscribe({
      next: ({ token }) => { this.auth.setToken(token); this.router.navigate(['/admin/dashboard']); },
      error: () => { this.error.set('Identifiants incorrects'); this.loading.set(false); },
    });
  }
}
