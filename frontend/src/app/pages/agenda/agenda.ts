import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardEventComponent } from '../../components/card-event/card-event';
import { Evenement } from '../../models';

@Component({
  selector: 'app-agenda',
  imports: [CardEventComponent],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css'
})
export class AgendaComponent implements OnInit {
  private api = inject(ApiService);
  evenements = signal<Evenement[]>([]);

  ngOnInit() { this.api.getEvenements().subscribe(e => this.evenements.set(e)); }
}
