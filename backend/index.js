import express from 'express';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const app  = express();
const PORT = process.env.PORT || 4000;

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('FATAL: JWT_SECRET manquant ou trop court (min 32 chars)');
  process.exit(1);
}

app.use(express.json());
app.set('trust proxy', 1);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
});

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: 25,
  secure: false,
});

function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Non autorisé' });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
}

// ── Health ──────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ ok: true }));

// ── Acteurs (public) ─────────────────────────────────────────────────────────
app.get('/api/acteurs', async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM acteurs WHERE visible=1 ORDER BY nom'
  );
  res.json(rows);
});

app.get('/api/acteurs/:slug', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM acteurs WHERE slug=? AND visible=1', [req.params.slug]
  );
  if (!rows.length) return res.status(404).json({ error: 'Non trouvé' });
  res.json(rows[0]);
});

// ── Événements (public) ──────────────────────────────────────────────────────
app.get('/api/evenements', async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM evenements WHERE visible=1 AND date_debut >= NOW() ORDER BY date_debut'
  );
  res.json(rows);
});

app.get('/api/evenements/:slug', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM evenements WHERE slug=? AND visible=1', [req.params.slug]
  );
  if (!rows.length) return res.status(404).json({ error: 'Non trouvé' });
  res.json(rows[0]);
});

// ── Adhésion (public) ────────────────────────────────────────────────────────
app.post('/api/adhesion', async (req, res) => {
  const { nom, email, activite, message } = req.body ?? {};
  if (!nom?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'Nom et email requis' });
  }
  await pool.query(
    'INSERT INTO adhesions (nom, email, activite, message) VALUES (?,?,?,?)',
    [nom.trim(), email.trim(), activite?.trim() ?? '', message?.trim() ?? '']
  );
  try {
    await mailer.sendMail({
      from: 'icc@navetteinfo.fr',
      to: process.env.CONTACT_EMAIL,
      subject: `[ICC] Nouvelle adhésion — ${nom}`,
      text: `Nom: ${nom}\nEmail: ${email}\nActivité: ${activite ?? '-'}\nMessage: ${message ?? '-'}`,
    });
  } catch (e) {
    console.error('Mail adhesion error:', e.message);
  }
  res.json({ ok: true });
});

// ── Admin auth ───────────────────────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  const [rows] = await pool.query('SELECT * FROM admins WHERE email=?', [email]);
  if (!rows.length) return res.status(401).json({ error: 'Identifiants invalides' });
  const ok = await bcrypt.compare(password, rows[0].password);
  if (!ok) return res.status(401).json({ error: 'Identifiants invalides' });
  const token = jwt.sign({ id: rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

// ── Admin — acteurs ──────────────────────────────────────────────────────────
app.get('/api/admin/acteurs', auth, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM acteurs ORDER BY nom');
  res.json(rows);
});

app.post('/api/admin/acteurs', auth, async (req, res) => {
  const { slug, nom, categorie, description, contact, site_web, localite, photo_url, visible } = req.body;
  await pool.query(
    'INSERT INTO acteurs (slug,nom,categorie,description,contact,site_web,localite,photo_url,visible) VALUES (?,?,?,?,?,?,?,?,?)',
    [slug, nom, categorie, description, contact, site_web, localite, photo_url, visible ?? 1]
  );
  res.json({ ok: true });
});

app.put('/api/admin/acteurs/:id', auth, async (req, res) => {
  const { nom, categorie, description, contact, site_web, localite, photo_url, visible } = req.body;
  await pool.query(
    'UPDATE acteurs SET nom=?,categorie=?,description=?,contact=?,site_web=?,localite=?,photo_url=?,visible=? WHERE id=?',
    [nom, categorie, description, contact, site_web, localite, photo_url, visible, req.params.id]
  );
  res.json({ ok: true });
});

app.delete('/api/admin/acteurs/:id', auth, async (req, res) => {
  await pool.query('DELETE FROM acteurs WHERE id=?', [req.params.id]);
  res.json({ ok: true });
});

// ── Admin — événements ───────────────────────────────────────────────────────
app.get('/api/admin/evenements', auth, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM evenements ORDER BY date_debut DESC');
  res.json(rows);
});

app.post('/api/admin/evenements', auth, async (req, res) => {
  const { slug, titre, description, lieu, date_debut, date_fin, lien_insc, visible } = req.body;
  await pool.query(
    'INSERT INTO evenements (slug,titre,description,lieu,date_debut,date_fin,lien_insc,visible) VALUES (?,?,?,?,?,?,?,?)',
    [slug, titre, description, lieu, date_debut, date_fin, lien_insc, visible ?? 1]
  );
  res.json({ ok: true });
});

app.put('/api/admin/evenements/:id', auth, async (req, res) => {
  const { titre, description, lieu, date_debut, date_fin, lien_insc, visible } = req.body;
  await pool.query(
    'UPDATE evenements SET titre=?,description=?,lieu=?,date_debut=?,date_fin=?,lien_insc=?,visible=? WHERE id=?',
    [titre, description, lieu, date_debut, date_fin, lien_insc, visible, req.params.id]
  );
  res.json({ ok: true });
});

app.delete('/api/admin/evenements/:id', auth, async (req, res) => {
  await pool.query('DELETE FROM evenements WHERE id=?', [req.params.id]);
  res.json({ ok: true });
});

// ── Admin — adhésions (lecture) ──────────────────────────────────────────────
app.get('/api/admin/adhesions', auth, async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM adhesions ORDER BY created_at DESC');
  res.json(rows);
});

app.listen(PORT, () => console.log(`[icc-api] :${PORT}`));
