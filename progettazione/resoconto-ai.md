# Resoconto del lavoro con l'AI — Segnale

## Sessione 1 · 18 novembre

**Obiettivo:** trasformare il Programma in un elenco generato dai dati (due JSON collegati) e aggiungere il meteo di Torino in Info e luoghi.

- **Che cosa ho chiesto:** completare `eventi.json` e `sedi.json` con i quattro eventi e le due sedi mancanti, senza rinumerare quelli già presenti; preparare lo schema dati in Mermaid; generare le schede del Programma dai due file; aggiungere un riquadro meteo che legga l'API Open-Meteo.
- **Che cosa è stato proposto:** due entità Evento e Sede collegate da `sede_id`; un `programma.js` che fa `fetch` dei due JSON e costruisce le schede; un `meteo.js` separato che richiede temperatura, vento e ora; messaggi distinti per caricamento, elenco vuoto, errore di lettura file ed errore del meteo.
- **Che cosa ho usato:** la struttura a due entità e il legame `sede_id`; i quattro stati del Programma; la lettura separata del meteo, così un errore dell'API non blocca il resto della pagina.
- **Che cosa ho modificato:** ho mantenuto nomi, descrizioni e immagini già presenti nel mio sito; ho verificato che i tre `sede_id` corrispondessero alle tre sedi; ho usato il colore e la tipografia già definiti nel `style.css`.
- **Che cosa ho scartato:** non ho aggiunto campi non previsti dallo schema (per esempio un prezzo o un contatto); non ho usato database, Node.js o npm; non ho cambiato la disposizione del menu tra telefono e desktop.
- **Come ho verificato:** aperto il sito con un server locale e controllato nel Network che `eventi.json` e `sedi.json` rispondessero 200; letto le sei schede e i nomi delle sedi; provato lo stato vuoto con `[]` in `eventi.json`, l'errore rinominando `sedi.json`, e la sede «da definire» con un `sede_id` inesistente; verificato che l'errore del meteo restasse nel solo riquadro.
- **Problemi e soluzioni:** la lettura dei file con doppio clic (`file://`) blocca il `fetch`, quindi ho aperto il sito con anteprima locale su HTTP; un `sede_id` senza corrispondenza non fa saltare la scheda, ma mostra «Sede da definire».
