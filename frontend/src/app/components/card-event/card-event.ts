import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Evenement } from '../../models';

@Component({
  selector: 'app-card-event',
  imports: [DatePipe],
  template: `
    <div class="card event-card">
      <div class="event-header">
        <img src="/images/hero-nature.svg" alt="" class="event-bg-img" aria-hidden="true">
        <div class="event-date-overlay">
          <span class="event-day">{{ event().date_debut | date:'d' }}</span>
          <span class="event-month">{{ event().date_debut | date:'MMM':'':'fr' }}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title">{{ event().titre }}</div>
        @if (event().lieu) {
          <div class="card-meta">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {{ event().lieu }}
          </div>
        }
        <p class="card-desc">{{ event().description }}</p>
      </div>
      @if (event().lien_insc) {
        <div class="card-footer">
          <a [href]="event().lien_insc" target="_blank" rel="noopener" class="btn btn-earth btn-sm">S'inscrire</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .event-card { display: flex; flex-direction: column; }
    .event-header {
      position: relative;
      height: 130px;
      overflow: hidden;
    }
    .event-bg-img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .35s ease;
    }
    .event-card:hover .event-bg-img { transform: scale(1.05); }
    .event-date-overlay {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(42,107,69,.82);
      backdrop-filter: blur(4px);
      border-radius: 12px;
      padding: 10px 20px;
      text-align: center;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      box-shadow: 0 4px 16px rgba(0,0,0,.25);
    }
    .event-day { font-size: 2rem; font-family: var(--font-display); font-weight: 700; line-height: 1; }
    .event-month { font-size: .8rem; text-transform: uppercase; letter-spacing: .1em; opacity: .9; }
    .card-meta { font-size: .82rem; color: var(--stone); margin-top: 6px; display: flex; align-items: center; gap: 4px; }
    .card-meta svg { color: var(--stone); flex-shrink: 0; }
    .card-desc { margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  `]
})
export class CardEventComponent {
  event = input.required<Evenement>();
}
