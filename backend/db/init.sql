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

-- Acteurs fondateurs
INSERT IGNORE INTO acteurs (slug, nom, categorie, description, localite, visible) VALUES
  ('navetteinfo', 'NavetteInfo', 'numerique', 'Développement web et numérique local — navetteinfo.fr', 'Cerdagne', 1),
  ('informatique-cerdagne', 'Informatique Cerdagne', 'numerique', 'Informatique, réparation et numérique local en Cerdagne.', 'Cerdagne', 1),
  ('bruno-reparations', 'Bruno Réparations', 'reparation', 'Réparation et réemploi d\'objets — donner une seconde vie aux équipements.', 'Cerdagne', 1);
