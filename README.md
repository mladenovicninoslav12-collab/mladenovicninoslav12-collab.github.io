# 🚀 Barber Elite - Full Stack Setup

## Projekat struktura
```
Desktop/
├── index.html                (Frontend - javna stranica)
├── style.css
├── script.js                 (API integracija)
├── api.js                    (API helper)
│
└── barber-api/                (Backend - Node.js)
    ├── server.js
    ├── routes/
    ├── controllers/
    └── .env
```

---

## ⚡ BRZO POKRETANJE (3 KORAKA)

### **1️⃣ BACKEND - Terminal 1**
```powershell
cd c:\Users\HP\Desktop\barber-api
npm run dev
```
✅ Backend pokrenut na **http://localhost:5000**

### **2️⃣ FRONTEND - Terminal 2**
```powershell
cd c:\Users\HP\Desktop\mladenovicninoslav12-collab.github.io
# Otvori sa Live Server (desni klik → Open with Live Server)
```
✅ Frontend pokrenut na **http://localhost:3000 ili http://127.0.0.1:5500**

### **3️⃣ TESTIRAJ REZERVACIJU**
- Otvori sajt
- Popuni formu sa test podacima
- Klikni "Pošalji zahtev"
- Proverite:
  - ✅ Poruka u pretraživaču
  - ✅ Console log (F12 → Console)
  - ✅ Rezervacija u localStorage (F12 → Application → Local Storage)

---

## 📧 EMAIL KONFIGURACIJA (Opciono za sad)

Da email radi sa stvarnim slanjem:

### Gmail setup:
1. Otvori https://myaccount.google.com/apppasswords
2. Kreiraj app password
3. U `.env` fajl dodaj:
```
EMAIL_USER=tvoj_email@gmail.com
EMAIL_PASSWORD=xxx xxx xxx xxx
```

**Za sada:** Email se simulira u konzoli (ne zahteva konfiguraciju)

---

## 📋 API Endpoints

### Kreiraj rezervaciju
```bash
POST http://localhost:5000/api/bookings

Body:
{
  "name": "Marko",
  "email": "marko@example.com",
  "phone": "0601234567",
  "service": "Šišanje",
  "date": "2026-05-20T14:30"
}
```

### Preuzmi sve rezervacije
```bash
GET http://localhost:5000/api/bookings
```

---

## 🧪 TESTIRANJE SA POSTMAN-om

1. Preuzmi https://www.postman.com/
2. Import → Raw → Dodaj iznad endpoint-e
3. Test POST na `/api/bookings` sa test podacima

---

## 🎯 NEXT STEPS (SUTRA)

- [ ] Admin login stranica
- [ ] PostgreSQL baza
- [ ] Dashboard sa statistikom
- [ ] Stripe integracija

---

## 🐛 TROUBLESHOOTING

**"Cannot find module 'express'"**
```powershell
cd barber-api
npm install
```

**"CORS error"**
- Proverite da je backend pokrenutan na 5000
- Restartujte Live Server (Ctrl+Shift+P → Restart)

**"Email nije poslat"**
- Za sada je OK, email se simulira
- Poverite console.log u server.js

---

## 📞 Kontakt

Backend server: `http://localhost:5000`
Frontend: `http://localhost:3000 ili 5500`

Svi API pozivi idu na `/api/...` rutu.

Happy coding! 🎉
