CREATE TABLE IF NOT EXISTS acteurs (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(120) NOT NULL UNIQUE,
  nom         VARCHAR(200) NOT NULL,
  categorie   ENUM('numerique','reparation','artisanat','alimentation','autre') NOT NULL DEFAULT 'autre',
  description TEXT,
  contact     VARCHAR(200),
  site_web    VARCHAR(300),
  localite    VARCHAR(100),
  photo_url   VARCHAR(300),
  visible     TINYINT(1) NOT NULL DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS evenements (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(120) NOT NULL UNIQUE,
  titre       VARCHAR(200) NOT NULL,
  description TEXT,
  lieu        VARCHAR(200),
  date_debut  DATETIME NOT NULL,
  date_fin    DATETIME,
  lien_insc   VARCHAR(300),
  visible     TINYINT(1) NOT NULL DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS adhesions (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nom         VARCHAR(200) NOT NULL,
  email       VARCHAR(200) NOT NULL,
  activite    VARCHAR(200),
  message     TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  email       VARCHAR(200) NOT NULL UNIQUE,
  password    VARCHAR(200) NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin par défaut (password: icc-admin-2026 — à changer en prod)
INSERT IGNORE INTO admins (email, password) VALUES
  ('admin@icc-cerdagne.fr', '$2a$10$3YH8VuRHBN3mOZ2JNRxt0.ppbqNTEQPZAuaZv8MvMlax5OrI20qCu');

-- Acteurs fondateurs
INSERT INTO acteurs (slug, nom, categorie, description, contact, site_web, localite, visible) VALUES
  ('navetteinfo', 'NavetteInfo', 'numerique',
   'Développement web, cybersécurité et numérique local. Audit de sécurité, pentest, honeypot, infrastructure VPS — navetteinfo.fr',
   'navettethales@gmail.com', 'https://navetteinfo.fr', 'Cerdagne', 1),
  ('informatique-cerdagne', 'Informatique Cerdagne', 'numerique',
   'Informatique locale en Cerdagne : dépannage, réparation, développement web et accompagnement numérique pour les particuliers et associations.',
   NULL, NULL, 'Cerdagne', 1),
  ('bruno-reparations', 'Bruno Réparations', 'reparation',
   'Réparation et réemploi d\'objets — donner une seconde vie aux équipements électroniques et électroménagers.',
   NULL, NULL, 'Cerdagne', 1)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  contact     = VALUES(contact),
  site_web    = VALUES(site_web);
