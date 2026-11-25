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

Programma generato da due elenchi collegati, con riquadro meteo in Info e luoghi.

- `dati/eventi.json` — Sei eventi del festival (copia di riferimento; la pagina non lo legge più)
- `dati/sedi.json` — Tre sedi, collegate agli eventi tramite `sede_id` (copia di riferimento)
- `dati/SCHEMA.md` — Scheda dati delle entità Evento, Sede e Notizia, con schema Mermaid
- `meteo.js` — Legge temperatura, vento e ora da Open-Meteo nella pagina Info
- `progettazione/resoconto-ai.md` — Resoconto del lavoro con l'AI

## Consegna 9 — Dati da foglio Google pubblicato in CSV

Il Programma non legge più i JSON della repository: eventi e sedi arrivano da un foglio Google pubblicato sul web in formato CSV, analizzato con Papa Parse. La Home legge un terzo CSV con le ultime cinque notizie ANSA Piemonte, lette dal foglio tramite `IMPORTFEED` (il browser non può leggere il RSS diretto per CORS).

- `dati/eventi.csv` e `dati/sedi.csv` — CSV usati per importare le schede nel foglio
- `programma.js` — Costruisce le schede del Programma leggendo i due CSV pubblicati
- `notizie.js` — Legge il CSV delle notizie nella Home e ne mostra al massimo cinque
- I link CSV pubblicati sono in cima a `programma.js` e `notizie.js`

## Note

- Il festival, gli eventi e le sedi sono immaginari: sono riferimenti per l'esercitazione didattica.
- I dati meteo sono forniti da Open-Meteo, licenza CC BY 4.0.
- Le notizie della Home provengono dal feed RSS di ANSA Piemonte; i contenuti appartengono ad ANSA.
