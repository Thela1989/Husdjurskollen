# 🩺 Hälsa – Vaccinationer, vikt, avmaskning m.m.

Denna del av appen hanterar djurets hälsodata. All information är kopplad till specifika djur.

## ✨ Funktioner

- Lista hälsoposter per djur
- Lägg till ny hälsopost
- Redigera befintliga poster
- Ta bort poster
- Filtrera/sortera per typ (t.ex. vaccinationer, avmaskning)
- Visa notiser om något är aktuellt idag (t.ex. en planerad vaccination)

## 📁 Hälsotyper
- Vaccination
- Avmaskning
- Vikt
- Övrigt (t.ex. operationer, skador)

## 💡 UI-idé
- Accordion / rullgardinsmeny per kategori
- Datum visas i format: `ÅÅÅÅ-MM-DD`
- Redigeringsknapp på varje post

## 🗃 Databasstruktur (tabell: `pethealth`)
| Kolumn     | Typ     | Beskrivning                        |
|------------|---------|------------------------------------|
| id         | serial  | Primärnyckel                       |
| pet_id     | int     | Kopplad till husdjuret             |
| type       | text    | Typ av hälsohändelse               |
| title      | text    | Titel (t.ex. "Rabiesvaccin")       |
| date       | date    | Datum för händelsen                |
| notes      | text    | (Valfritt) extra anteckningar      |

## 🔌 API-routes
- `GET /health/:petId` – hämta hälsoposter för ett djur
- `POST /health` – lägg till ny hälsopost
- `PUT /health/:id` – uppdatera hälsopost
- `DELETE /health/:id` – ta bort post

## 📋 Todo
- [ ] UI-komponent med rullgardinsstruktur
- [ ] Lägg till funktion för notis om datum = idag
- [ ] Bekräftelsemodal vid radering
- [ ] Redigering direkt i listan
