import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Evenement } from '../../models';

@Component({
  selector: 'app-evenements-admin',
  imports: [FormsModule, RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './evenements.html',
})
export class EvenementsAdminComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);
  router = inject(Router);

  evenements = signal<Evenement[]>([]);
  showModal = signal(false);
  editing = signal<Evenement | null>(null);
  form: Partial<Evenement> = {};

  ngOnInit() { this.load(); }
  load() { this.api.adminGetEvenements().subscribe(e => this.evenements.set(e)); }

  openNew() { this.editing.set(null); this.form = { visible: 1 }; this.showModal.set(true); }
  openEdit(e: Evenement) { this.editing.set(e); this.form = { ...e }; this.showModal.set(true); }

  save() {
    const ed = this.editing();
    const obs = ed ? this.api.adminPutEvenement(ed.id, this.form) : this.api.adminPostEvenement(this.form);
    obs.subscribe(() => { this.showModal.set(false); this.load(); });
  }

  delete(e: Evenement) {
    if (!confirm(`Supprimer "${e.titre}" ?`)) return;
    this.api.adminDeleteEvenement(e.id).subscribe(() => this.load());
  }

  logout() { this.auth.logout(); this.router.navigate(['/admin/login']); }
}
