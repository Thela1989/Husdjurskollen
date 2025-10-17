# 🧭 Flödesdiagram – Användarens väg genom appen

Det här diagrammet visar hur användaren rör sig genom appen – från registrering till skötsel och hälsoposter.

## 💡 Användarflöde

```mermaid
graph TD
  Start[Start / Laddningsskärm] --> Registrera[Registrera användare]
  Registrera --> LoggaIn[Logga in]
  LoggaIn --> Hemsida[Huvudmeny / Välj djur]
  Hemsida --> LäggTillDjur[Lägg till nytt djur]
  Hemsida --> VäljDjur[Visa befintligt djur]

  VäljDjur --> DjurProfil[Djurets profilsida]
  DjurProfil --> Skötsel[Skötseluppgifter]
  DjurProfil --> Hälsa[Hälsoposter]

  Skötsel --> LäggTillSkötsel[Lägg till ny uppgift]
  Hälsa --> LäggTillHälsa[Lägg till hälsopost]
  Hälsa --> Påminnelse[Visa dagens påminnelser]
