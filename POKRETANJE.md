# 🎯 KAKO POKRENUTI KOMPLETAN SISTEM

## **TRENUTNO STANJE: MVP (Minimum Viable Product)**

✅ **Frontend** - Kompletna barber stranica sa rezervacijama
✅ **Backend** - Express API sa in-memory bazom
✅ **Email** - Simulacija (spreman za pravi email)
✅ **Admin Panel** - Login + Dashboard

---

## **📂 STRUKTURA PROJEKTA**

```
Desktop/
│
├── index.html                ← FRONTEND (GitHub Pages / Live Server)
├── style.css
├── script.js                 (API integracija)
├── api.js                    (Helper funkcije)
│
├── barber-api/                ← BACKEND (Node.js)
│   ├── server.js              (Express app)
│   ├── routes/
│   │   └── bookings.js
│   ├── controllers/
│   │   └── bookingController.js
│   ├── .env                   (Tajne)
│   └── package.json
│
├── admin/                     ← ADMIN PANEL
│   ├── login.html             (Prijava - test: admin@barberelite.rs / admin123)
│   └── dashboard.html         (Pregled rezervacija)
│
└── README.md
```

---

## **🚀 QUICK START - 2 TERMINALA**

### **Terminal 1 - Backend pokreće se:**
```powershell
cd c:\Users\HP\Desktop\barber-api
npm run dev
```
Čekaj dok vidiš: `🚀 Barber API pokrenut na http://localhost:5000`

### **Prije pokretanja backend-a**

1. Uđite u `barber-api` i kopirajte primer `.env` fajla:

```powershell
cd barber-api
copy .env.example .env
```

2. Otvorite `.env` i popunite vrednosti `EMAIL_USER`, `EMAIL_PASSWORD` i `ADMIN_EMAIL` ako želite da šaljete prave email-ove. Ako ne popunite, email funkcionalnost će biti simulirana i rezervacije će i dalje raditi.


### **Terminal 2 - Frontend pokreće se:**
```powershell
cd 'c:\Users\HP\Desktop\mladenovicninoslav12-collab.github.io'
# Desni klik na index.html → Open with Live Server
```
Trebao bi se otvoriti sajt na `http://localhost:5500` ili `http://127.0.0.1:5500`

---

## **✅ TESTIRANJE SISTEMA**

### **1. Testiraj rezervaciju:**
1. Otvori `http://localhost:5500`
2. Popuni formu (svi podaci obavezni)
3. Klikni **"Pošalji zahtev"**
4. Trebalo bi da vidiš poruku: **"✅ Hvala [Ime]! Uspešno ste poslali zahtev..."**

### **2. Testiraj Admin panel:**
1. Otvori `http://localhost:5500/admin/login.html`
2. Email: `admin@barberelite.rs`
3. Lozinka: `admin123`
4. Klikni **"Prijava"**
5. Trebalo bi da vidiš Dashboard sa statistikom

### **3. Testiraj API direktno (Postman ili curl):**

**Kreiraj rezervaciju:**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marko",
    "email": "marko@example.com",
    "phone": "0601234567",
    "service": "Šišanje",
    "date": "2026-05-20T14:30"
  }'
```

**Preuzmi sve rezervacije:**
```bash
curl http://localhost:5000/api/bookings
```

---

## **🔧 TROUBLESHOOTING**

| Problem | Rešenje |
|---------|--------|
| **CORS error** | Restartuj Live Server (Ctrl+Shift+P → Restart) |
| **Backend greška** | `npm install` u barber-api direktorijumu |
| **Admin se ne učitava** | Proverite da je backend pokrenutan |
| **Rezervacija ne ide** | Otvori F12 → Console → vidji šta je greška |

---

## **📋 SLEDEĆE FAZE (SUTRA)**

### **FAZA 2: Pravi Administrator**
- [ ] PostgreSQL baza
- [ ] JWT autentifikacija
- [ ] Kompletan CRUD za rezervacije
- [ ] Email notifikacije (real)

### **FAZA 3: Premium Features**
- [ ] Stripe plaćanja
- [ ] SMS notifikacije
- [ ] Multi-admin podrška

---

## **🎯 ZADACI ZA SADA**

1. **Pokreni backend:** `npm run dev` u barber-api
2. **Pokreni frontend:** Open with Live Server
3. **Testiraj rezervaciju** na javnoj stranici
4. **Testiraj admin login** (admin@barberelite.rs / admin123)
5. **Proverite konzolu** (F12) za sve logove

---

## **📞 CHECKPOINT - ŠEKIRAJ PRIJE NEGO ŠTO IDEŠ DALJE**

**Trebalo bi da radiš:**
- ✅ Javna stranica - vidljiva i lepša
- ✅ Forma za rezervaciju - prima podatke
- ✅ Backend API - prima POST zahteve
- ✅ Admin panel - prikazuje rezervacije
- ✅ Dashboard - vidiš statistiku

**Ako sve radi** → Spreman si za Fazu 2 (PostgreSQL + JWT)

---

## **💡 PRO TIPS**

1. **Za email slanje (kasnije):**
   - Otvori `barber-api/.env`
   - Dodaj Gmail credencijale
   - Email će se slati automatski

2. **Za debugging:**
   - F12 → Console (vidis sve greške)
   - Network tab (vidiš sve API pozive)

3. **Za novo testiranje:**
   - Otvori DevTools → Application → Local Storage
   - Obrišu `bookings` ključ
   - Kreiraj novu rezervaciju

---

**SADA PROVERITE I KAŽITE MI STA VIDITE! 🚀**
