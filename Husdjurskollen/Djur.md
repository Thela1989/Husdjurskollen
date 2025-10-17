# 🐶 Djur – Funktioner och data

I denna del av appen hanterar användaren sina husdjur. Varje djur får en egen "profil" med koppling till skötsel och hälsoposter.

## ✨ Funktioner

- Lägg till nytt djur (namn, art, ras, födelsedatum, bild)
- Redigera djurinfo
- Ta bort djur
- Lista alla användarens djur
- Klicka på djur för att komma till dess sida
- Länkar till: [[Hälsa]] och [[Skötsel]]

## 🖼 UI-idé
- Lista med djurkort (kort per djur)
- Plus-knapp (+) för att lägga till nytt djur
- Klick på djur → visa detaljer

## 🗃 Databasstruktur (tabell: `pets`)
| Kolumn        | Typ        | Beskrivning              |
|---------------|------------|--------------------------|
| id            | serial     | Primärnyckel             |
| user_id       | integer    | Kopplad till användare   |
| name          | text       | Djurets namn             |
| species       | text       | Art (hund, katt, etc.)   |
| breed         | text       | Ras                      |
| birthdate     | date       | Födelsedatum             |
| image_url     | text       | (Valfritt) bildlänk      |

## 📌 API-routes
- `GET /pets/:userId` – hämta alla djur för en användare
- `POST /pets` – lägg till nytt djur
- `PUT /pets/:id` – uppdatera djurinfo
- `DELETE /pets/:id` – ta bort djur

## 📋 Todo
- [ ] UI för djurkort
- [ ] Formulär för att lägga till nytt djur
- [ ] Validering av inmatning
- [ ] Koppling till hälsa/skötsel
