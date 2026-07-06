# Barber Elite

Kratak full-stack projekat za frizerski salon.

## Struktura

- `index.html`, `style.css`, `script.js`, `api.js` - frontend na root-u
- `admin/` - login i dashboard
- `barber-api/` - Express backend

## Pokretanje lokalno

### Backend
```powershell
cd .\barber-api
npm install
npm run dev
```

### Frontend
Otvori `index.html` sa Live Server-om ili kroz browser.

## API

- `POST /api/bookings` - kreiranje rezervacije
- `GET /api/bookings` - lista rezervacija
- `PUT /api/bookings/:id` - promena statusa
- `DELETE /api/bookings/:id` - brisanje rezervacije

## GitHub Pages

Repo je spreman za GitHub Pages jer je javni frontend u root-u i prati `main` granu.

U GitHub podešavanjima uključi:

- Settings
- Pages
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

Posle toga sajt će raditi direktno sa GitHub Pages URL-a, a admin ostaje pod `/admin/login.html`.

## Napomena za email

Ako `.env` nije popunjen, email se samo simulira i rezervacije i dalje rade.
