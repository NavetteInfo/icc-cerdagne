import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Evenement } from '../../models';

@Component({
  selector: 'app-card-event',
  imports: [DatePipe],
  template: `
    <div class="card event-card">
      <div class="event-date-band">
        <span class="event-day">{{ event().date_debut | date:'d' }}</span>
        <span class="event-month">{{ event().date_debut | date:'MMM':'':'fr' }}</span>
      </div>
      <div class="card-body">
        <div class="card-title">{{ event().titre }}</div>
        @if (event().lieu) {
          <div class="card-meta">📍 {{ event().lieu }}</div>
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
    .event-date-band {
      background: var(--green);
      color: white;
      text-align: center;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .event-day { font-size: 2rem; font-family: var(--font-display); font-weight: 700; line-height: 1; }
    .event-month { font-size: .85rem; text-transform: uppercase; letter-spacing: .08em; opacity: .85; }
    .card-meta { font-size: .82rem; color: var(--stone); margin-top: 6px; }
    .card-desc { margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  `]
})
export class CardEventComponent {
  event = input.required<Evenement>();
}
