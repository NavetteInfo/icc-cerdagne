import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-rejoindre',
  imports: [FormsModule],
  templateUrl: './rejoindre.html',
  styleUrl: './rejoindre.css'
})
export class RejoindreComponent {
  private api = inject(ApiService);

  form = { nom: '', email: '', activite: '', message: '' };
  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  submit() {
    if (!this.form.nom || !this.form.email) return;
    this.status.set('loading');
    this.api.submitAdhesion(this.form).subscribe({
      next: () => { this.status.set('success'); this.form = { nom: '', email: '', activite: '', message: '' }; },
      error: () => this.status.set('error'),
    });
  }
}
