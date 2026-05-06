import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Acteur } from '../../models';

@Component({
  selector: 'app-acteurs-admin',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './acteurs.html',
})
export class ActeursAdminComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);
  router = inject(Router);

  acteurs = signal<Acteur[]>([]);
  showModal = signal(false);
  editing = signal<Acteur | null>(null);
  form: Partial<Acteur> = {};

  ngOnInit() { this.load(); }
  load() { this.api.adminGetActeurs().subscribe(a => this.acteurs.set(a)); }

  openNew() {
    this.editing.set(null);
    this.form = { categorie: 'autre', visible: 1 };
    this.showModal.set(true);
  }

  openEdit(a: Acteur) {
    this.editing.set(a);
    this.form = { ...a };
    this.showModal.set(true);
  }

  save() {
    const ed = this.editing();
    const obs = ed ? this.api.adminPutActeur(ed.id, this.form) : this.api.adminPostActeur(this.form);
    obs.subscribe(() => { this.showModal.set(false); this.load(); });
  }

  delete(a: Acteur) {
    if (!confirm(`Supprimer ${a.nom} ?`)) return;
    this.api.adminDeleteActeur(a.id).subscribe(() => this.load());
  }

  logout() { this.auth.logout(); this.router.navigate(['/admin/login']); }
}
