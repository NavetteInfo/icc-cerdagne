import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  auth = inject(AuthService);
  router = inject(Router);

  stats = signal({ acteurs: 0, evenements: 0, adhesions: 0 });

  ngOnInit() {
    this.api.adminGetActeurs().subscribe(a => this.stats.update(s => ({ ...s, acteurs: a.length })));
    this.api.adminGetEvenements().subscribe(e => this.stats.update(s => ({ ...s, evenements: e.length })));
    this.api.adminGetAdhesions().subscribe(a => this.stats.update(s => ({ ...s, adhesions: a.length })));
  }

  logout() { this.auth.logout(); this.router.navigate(['/admin/login']); }
}
