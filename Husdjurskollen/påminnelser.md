# 🔔 Påminnelser – Få notiser om vad som ska göras idag

Appen visar **enkla och tydliga påminnelser i gränssnittet** när det är dags att göra något med sitt husdjur, t.ex. vaccination eller kloklippning.

## ✨ Funktioner

- Visa dagens skötseluppgifter automatiskt
- Visa dagens hälsoposter (t.ex. planerad vaccinering)
- Separat avsnitt på hemskärmen: "🔔 Idag behöver du..."
- Filtrerar fram uppgifter där datum = idag
- Notiser visas per djur

## 💡 UI-idé
- Enkel ruta högst upp med ikoner:
  > 🐶 "Idag ska Nala få avmaskning!"  
  > 🐱 "Milo ska vaccineras idag."
- Grön bock visas om uppgiften är avklarad

## 🧠 Teknisk lösning

- Filtrera i frontend med `new Date().toISOString().split('T')[0]`
- Jämför det mot `date` i skötsel/hälsa
- Visa bara om `done = false`

## 🧪 Exempel på logik i pseudokod
```javascript
const today = new Date().toISOString().split('T')[0];
const todaysTasks = allTasks.filter(task => task.date === today && !task.done);
