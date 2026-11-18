# Segnale — Festival di design

Progetto didattico immaginario per le esercitazioni di Ipermedia e AI. Il repository contiene le due consegne svolte sullo stesso sito, come richiesto dal corso.

## Sito pubblico

- Home: https://pietro2002519.github.io/festival-segnale/
- Programma: https://pietro2002519.github.io/festival-segnale/programma.html
- Info e luoghi: https://pietro2002519.github.io/festival-segnale/info.html

## Consegna 7 — Identità visiva e navigazione

Sito a tre pagine con caratteri web, intestazione fissa (sticky) e menu responsive.

- `index.html` — Home
- `programma.html` — Programma
- `info.html` — Info e luoghi
- `style.css` — Stile condiviso: colori, caratteri, griglia responsive, intestazione sticky
- `assets/` — Favicon e immagini del festival
- `progettazione/moodboard.pdf` — Moodboard commentato con scelte di colore, carattere e spazi
- `progettazione/moodboard.html` — Sorgente della moodboard

## Consegna 8 — Programma dai dati e meteo da API

Programma generato da due file JSON collegati, con riquadro meteo in Info e luoghi.

- `dati/eventi.json` — Sei eventi del festival
- `dati/sedi.json` — Tre sedi, collegate agli eventi tramite `sede_id`
- `dati/SCHEMA.md` — Scheda dati delle entità Evento e Sede, con schema Mermaid
- `programma.js` — Costruisce le schede del Programma leggendo i due JSON
- `meteo.js` — Legge temperatura, vento e ora da Open-Meteo nella pagina Info
- `progettazione/resoconto-ai.md` — Resoconto del lavoro con l'AI

## Note

- Il festival, gli eventi e le sedi sono immaginari: sono riferimenti per l'esercitazione didattica.
- I dati meteo sono forniti da Open-Meteo, licenza CC BY 4.0.
