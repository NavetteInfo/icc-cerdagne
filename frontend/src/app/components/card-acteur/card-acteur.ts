import { Component, input } from '@angular/core';
import { Acteur, CATEGORIES } from '../../models';

@Component({
  selector: 'app-card-acteur',
  template: `
    <div class="card">
      <div class="card-img-wrap">
        @if (acteur().photo_url) {
          <img class="card-img" [src]="acteur().photo_url" [alt]="acteur().nom">
        } @else {
          <div class="card-img-placeholder">{{ acteur().nom[0] }}</div>
        }
        <span class="badge badge-{{ acteur().categorie }}">{{ catLabel() }}</span>
      </div>
      <div class="card-body">
        <div class="card-title">{{ acteur().nom }}</div>
        @if (acteur().localite) {
          <div class="card-meta">📍 {{ acteur().localite }}</div>
        }
        <p class="card-desc">{{ acteur().description }}</p>
      </div>
      <div class="card-footer">
        @if (acteur().contact) {
          <a [href]="'mailto:' + acteur().contact" class="btn btn-outline btn-sm">Contact</a>
        }
        @if (acteur().site_web) {
          <a [href]="acteur().site_web" target="_blank" rel="noopener" class="btn btn-sm" style="color:var(--green)">Site →</a>
        }
      </div>
    </div>
  `,
  styles: [`
    .card-img-wrap { position: relative; }
    .card-img-placeholder {
      height: 140px; background: var(--green-light);
      display: flex; align-items: center; justify-content: center;
      font-size: 2.5rem; font-family: var(--font-display); color: var(--green);
    }
    .badge { position: absolute; top: 10px; left: 10px; }
    .card-meta { font-size: .82rem; color: var(--stone); margin-top: 6px; }
    .card-desc { margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  `]
})
export class CardActeurComponent {
  acteur = input.required<Acteur>();
  catLabel() { return CATEGORIES[this.acteur().categorie] ?? this.acteur().categorie; }
}
