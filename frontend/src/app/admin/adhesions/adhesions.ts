import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Adhesion } from '../../models';

@Component({
  selector: 'app-adhesions-admin',
  imports: [RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './adhesions.html',
})
export class AdhesionsAdminComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);
  router = inject(Router);

  adhesions = signal<Adhesion[]>([]);
  selected = signal<Adhesion | null>(null);

  ngOnInit() { this.load(); }
  load() { this.api.adminGetAdhesions().subscribe(a => this.adhesions.set(a)); }

  open(a: Adhesion) { this.selected.set(a); }
  close() { this.selected.set(null); }

  delete(a: Adhesion) {
    if (!confirm(`Supprimer la demande de ${a.nom} ? (RGPD — irréversible)`)) return;
    this.api.adminDeleteAdhesion(a.id).subscribe(() => this.load());
  }

  logout() { this.auth.logout(); this.router.navigate(['/admin/login']); }
}
