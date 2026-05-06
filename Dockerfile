# ── Stage 1 : Build Angular ──────────────────────────────────────────────────
FROM node:22-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npx ng build --configuration production

# ── Stage 2 : nginx ──────────────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=frontend-builder /app/dist/icc-frontend/browser /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
