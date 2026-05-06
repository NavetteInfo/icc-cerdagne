import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  { path: 'annuaire', loadComponent: () => import('./pages/annuaire/annuaire').then(m => m.AnnuaireComponent) },
  { path: 'agenda', loadComponent: () => import('./pages/agenda/agenda').then(m => m.AgendaComponent) },
  { path: 'rejoindre', loadComponent: () => import('./pages/rejoindre/rejoindre').then(m => m.RejoindreComponent) },
  {
    path: 'admin',
    children: [
      { path: 'login', loadComponent: () => import('./admin/login/login').then(m => m.LoginComponent) },
      { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'acteurs', canActivate: [authGuard], loadComponent: () => import('./admin/acteurs/acteurs').then(m => m.ActeursAdminComponent) },
      { path: 'evenements', canActivate: [authGuard], loadComponent: () => import('./admin/evenements/evenements').then(m => m.EvenementsAdminComponent) },
      { path: 'adhesions', canActivate: [authGuard], loadComponent: () => import('./admin/adhesions/adhesions').then(m => m.AdhesionsAdminComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '' },
];
