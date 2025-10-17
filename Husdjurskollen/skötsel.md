# 🧼 Skötsel – Uppgifter för djurets omvårdnad

Här hanteras återkommande uppgifter och rutiner, som t.ex. kloklippning, borstning eller medicinering. Allt kopplas till ett specifikt djur.

## ✨ Funktioner

- Lägg till ny skötseluppgift (titel, datum, notering)
- Visa uppgifter per djur
- Markera uppgift som klar (checkbox)
- Redigera uppgift
- Ta bort uppgift
- Visning av dagens uppgifter som påminnelse i appen

## 💡 UI-idé
- Lista med checkboxar
- Färgskiftning för "idag", "försenat", "klart"
- Plus-knapp för att lägga till ny
- Skriv ut datum och kort beskrivning

## 🗃 Databasstruktur (tabell: `petcare`)
| Kolumn     | Typ     | Beskrivning                          |
|------------|---------|--------------------------------------|
| id         | serial  | Primärnyckel                         |
| pet_id     | int     | Kopplad till djuret                  |
| title      | text    | Namn på uppgift                      |
| date       | date    | Datum då uppgiften ska utföras       |
| done       | boolean | Om uppgiften är markerad som klar    |
| notes      | text    | (Valfritt) beskrivning eller info    |

## 🔌 API-routes
- `GET /care/:petId` – hämta skötseluppgifter för djuret
- `POST /care` – lägg till ny uppgift
- `PUT /care/:id` – uppdatera uppgift (t.ex. bocka i klar)
- `DELETE /care/:id` – ta bort uppgift

## 🛎️ Påminnelsefunktion
- Uppgifter med datum = idag visas högst upp
- Enkla notiser i gränssnittet, typ: "🐕 Dags att borsta Nala idag!"

## 📋 Todo
- [ ] Checkboxar som sparar status
- [ ] Påminnelsefunktion baserat på dagens datum
- [ ] Redigeringsformulär
- [ ] Ta bort-funktion med bekräftelse
