# UX-CodeCamp –Praktiska övningar

Elevversionen av UX-CodeCamp. Den innehåller samma kapitel som kursen, men bara kodrutorna – **Exempel** och **Övning** – med rubriken de hör till. Förklaringar, tabeller, tipsrutor, fördjupningar och quiz finns inte här. Eleverna provar i rutorna medan läraren förklarar.

**Skriv av – ändra sedan.** I varje Exempel-ruta är kodfliken tom från början. Steg 1: eleven skriver av koden som visas (exemplet går inte att markera, kopiera eller klistra in – men eleven kan kopiera och klistra in sin egen kod, inom och mellan rutorna). Rutan bockar av automatiskt när koden stämmer, och knappen *Kontrollera* visar vilken rad som skiljer sig. Blanksteg och kommentarer spelar ingen roll. Steg 2: eleven ändrar koden enligt uppgiften. Övningarna fungerar som förut.

**Biblioteket** (snabbreferens och Figma → CSS) finns med som i kursen. Playground, prov, quiz och progress finns inte i den här versionen.

## Kom igång

1. Öppna mappen i **VS Code** och starta **Live Server** på `index.html`.
2. Eller publicera mappen med GitHub Pages: **Settings → Pages**, branch `main`, mapp `/ (root)`.

Öppna sidan via Live Server eller GitHub Pages – inte genom att dubbelklicka på filen – annars visas inte bilderna.

## Filer

```
├── index.html
├── css/style.css
├── images/                  ← bilder till exemplen
└── js/
    ├── content-kurs.js      ← kapitlen med bara kodrutorna
    ├── content-library.js   ← Biblioteket (snabbreferensen)
    └── app.js               ← logiken
```

## Ändra kodrutorna

Kodrutorna ligger i `js/content-kurs.js`. Varje ruta är ett block med `t: "ex"` (Exempel) eller `t: "play"` (Övning), med `title`, `task`, `html` och `css`.

Senast öppnade kapitel och valt tema sparas i webbläsaren under egna namn, så den här versionen krockar inte med lärarversionen om båda ligger på samma webbplats.
