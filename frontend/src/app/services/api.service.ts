import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Acteur, Adhesion, Evenement } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = '/api';

  // ── Public ──────────────────────────────────────────────────────────────────
  getActeurs()               { return this.http.get<Acteur[]>(`${this.base}/acteurs`); }
  getActeur(slug: string)    { return this.http.get<Acteur>(`${this.base}/acteurs/${slug}`); }
  getEvenements()            { return this.http.get<Evenement[]>(`${this.base}/evenements`); }
  getEvenement(slug: string) { return this.http.get<Evenement>(`${this.base}/evenements/${slug}`); }
  submitAdhesion(data: { nom: string; email: string; activite: string; message: string }) {
    return this.http.post(`${this.base}/adhesion`, data);
  }

  // ── Admin ────────────────────────────────────────────────────────────────────
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.base}/admin/login`, { email, password });
  }

  adminGetActeurs()   { return this.http.get<Acteur[]>(`${this.base}/admin/acteurs`); }
  adminPostActeur(d: Partial<Acteur>)          { return this.http.post(`${this.base}/admin/acteurs`, d); }
  adminPutActeur(id: number, d: Partial<Acteur>) { return this.http.put(`${this.base}/admin/acteurs/${id}`, d); }
  adminDeleteActeur(id: number)                { return this.http.delete(`${this.base}/admin/acteurs/${id}`); }

  adminGetEvenements()   { return this.http.get<Evenement[]>(`${this.base}/admin/evenements`); }
  adminPostEvenement(d: Partial<Evenement>)          { return this.http.post(`${this.base}/admin/evenements`, d); }
  adminPutEvenement(id: number, d: Partial<Evenement>) { return this.http.put(`${this.base}/admin/evenements/${id}`, d); }
  adminDeleteEvenement(id: number)                { return this.http.delete(`${this.base}/admin/evenements/${id}`); }

  adminGetAdhesions() { return this.http.get<Adhesion[]>(`${this.base}/admin/adhesions`); }
}
