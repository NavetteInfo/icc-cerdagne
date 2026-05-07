import { Component, input, computed } from '@angular/core';
import { Acteur, CATEGORIES } from '../../models';

const CAT_IMAGES: Record<string, string> = {
  numerique:    '/images/cat-numerique.svg',
  reparation:   '/images/cat-reparation.svg',
  artisanat:    '/images/cat-artisanat.svg',
  alimentation: '/images/cat-alimentation.svg',
  autre:        '/images/cat-autre.svg',
};

@Component({
  selector: 'app-card-acteur',
  template: `
    <div class="card">
      <div class="card-img-wrap">
        <img class="card-img"
          [src]="imgSrc()"
          [alt]="acteur().nom"
          loading="lazy">
        <span class="badge badge-{{ acteur().categorie }}">{{ catLabel() }}</span>
      </div>
      <div class="card-body">
        <div class="card-title">{{ acteur().nom }}</div>
        @if (acteur().localite) {
          <div class="card-meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {{ acteur().localite }}
          </div>
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
    .card-img { width: 100%; height: 160px; object-fit: cover; display: block; }
    .badge { position: absolute; top: 10px; left: 10px; }
    .card-meta { font-size: .82rem; color: var(--stone); margin-top: 6px; display: flex; align-items: center; gap: 4px; }
    .card-meta svg { color: var(--stone); flex-shrink: 0; }
    .card-desc { margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  `]
})
export class CardActeurComponent {
  acteur = input.required<Acteur>();
  catLabel() { return CATEGORIES[this.acteur().categorie] ?? this.acteur().categorie; }
  imgSrc = computed(() => this.acteur().photo_url || CAT_IMAGES[this.acteur().categorie] || CAT_IMAGES['autre']);
}
