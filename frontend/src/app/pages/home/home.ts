import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CardActeurComponent } from '../../components/card-acteur/card-acteur';
import { CardEventComponent } from '../../components/card-event/card-event';
import { Acteur, Evenement } from '../../models';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardActeurComponent, CardEventComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);
  acteurs = signal<Acteur[]>([]);
  evenements = signal<Evenement[]>([]);

  ngOnInit() {
    this.api.getActeurs().subscribe(a => this.acteurs.set(a.slice(0, 3)));
    this.api.getEvenements().subscribe(e => this.evenements.set(e.slice(0, 3)));
  }
}
