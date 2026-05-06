export interface Acteur {
  id: number;
  slug: string;
  nom: string;
  categorie: 'numerique' | 'reparation' | 'artisanat' | 'alimentation' | 'autre';
  description: string;
  contact: string;
  site_web: string;
  localite: string;
  photo_url: string;
  visible: number;
}

export interface Evenement {
  id: number;
  slug: string;
  titre: string;
  description: string;
  lieu: string;
  date_debut: string;
  date_fin: string;
  lien_insc: string;
  visible: number;
}

export interface Adhesion {
  id: number;
  nom: string;
  email: string;
  activite: string;
  message: string;
  created_at: string;
}

export const CATEGORIES: Record<string, string> = {
  numerique:    'Numérique',
  reparation:   'Réparation',
  artisanat:    'Artisanat',
  alimentation: 'Alimentation',
  autre:        'Autre',
};
