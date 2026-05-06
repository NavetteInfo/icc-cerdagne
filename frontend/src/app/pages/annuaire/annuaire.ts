import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardActeurComponent } from '../../components/card-acteur/card-acteur';
import { Acteur, CATEGORIES } from '../../models';

@Component({
  selector: 'app-annuaire',
  imports: [CardActeurComponent],
  templateUrl: './annuaire.html',
  styleUrl: './annuaire.css'
})
export class AnnuaireComponent implements OnInit {
  private api = inject(ApiService);
  all = signal<Acteur[]>([]);
  activeFilter = signal('all');

  categories = Object.entries(CATEGORIES).map(([k, v]) => ({ key: k, label: v }));

  filtered = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.all() : this.all().filter(a => a.categorie === f);
  });

  ngOnInit() { this.api.getActeurs().subscribe(a => this.all.set(a)); }
}
