# Pokretanje

## Lokalno

### Backend
```powershell
cd .\barber-api
copy .env.example .env
npm install
npm run dev
```

### Frontend
Otvori `index.html` u browseru ili kroz Live Server.

## GitHub Pages

Kad je repo na GitHub-u, uključi Pages na:

- Settings
- Pages
- Branch: `main`
- Folder: `/ (root)`

Pošto je frontend u root-u, GitHub Pages će odmah koristiti `index.html`.

## Test

- Frontend: `index.html`
- Admin: `admin/login.html`
- API: `http://localhost:5000/api/bookings`

Ako `.env` nije podešen, email se samo simulira.
