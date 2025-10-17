# 🧩 Frontendstruktur – React + Context + Routing

Den här sidan beskriver hur frontend-koden är organiserad, med komponenter, vyer, routing och statehantering.

## 📁 Projektstruktur

src/  
├── components/  
│ ├── PetCard.tsx  
│ ├── HealthForm.tsx  
│ ├── CareForm.tsx  
│ ├── ReminderBox.tsx  
│ └── ThemeToggle.tsx  
├── views/  
│ ├── Home.tsx  
│ ├── PetProfile.tsx  
│ ├── Login.tsx  
│ ├── Register.tsx  
│ └── NotFound.tsx  
├── context/  
│ ├── AuthContext.tsx  
│ └── ThemeContext.tsx  
├── services/  
│ ├── api.ts  
│ └── auth.ts  
├── App.tsx  
├── main.tsx  
└── index.css


## ✨ Viktiga delar

### 📌 Komponenter (`components/`)
- Återanvändbara UI-element (kort, formulär, boxar)
- Används inne i vyerna

### 🌍 Vyer (`views/`)
- Fullständiga sidor som routas till via React Router
- Ex: startsida, inloggning, djurprofil

### ⚙️ Kontext (`context/`)
- Hanterar global state
- `AuthContext` → håller koll på inloggad användare
- `ThemeContext` → ljust/mörkt läge

### 🔌 Tjänster (`services/`)
- API-anrop
- Skicka token i headers
- Separera logik från UI

---

## 🛣️ Routing

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/pet/:id" element={<PetProfile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

