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

## Sessione 2 · 25 novembre

**Obiettivo:** passare i dati del Programma dai JSON della repository a un foglio Google pubblicato in CSV, e aggiungere nella Home un riquadro con le notizie di Torino lette dallo stesso tipo di fonte.

- **Che cosa ho chiesto:** tenere il sito già fatto e cambiare solo la fonte dati; leggere eventi e sedi dai CSV pubblicati con Papa Parse; aggiungere una sezione «Notizie da Torino» con al massimo cinque articoli; aggiornare lo schema e il resoconto.
- **Che cosa è stato proposto:** un foglio Google con tre schede (`eventi`, `sedi`, `notizie`), ciascuna pubblicata come CSV; `programma.js` e `notizie.js` scaricano il testo CSV e lo analizzano con Papa Parse (header: true); il foglio «notizie» usa `IMPORTFEED` per leggere il RSS di ANSA Piemonte, così il browser non subisce il blocco CORS del feed diretto.
- **Che cosa ho usato:** il legame `sede_id` con la sede corrispondente; la normalizzazione di `id` e `sede_id` come stringhe, perché dal CSV arrivano sempre valori di testo; gli stessi tre stati di caricamento, elenco vuoto ed errore già presenti nel Programma; il riquadro notizie separato, così un errore non blocca la Home.
- **Che cosa ho modificato:** ho mantenuto titoli, descrizioni, immagini, colori e tipografia del sito; ho lasciato i JSON in `dati/` come copia, ma le pagine non li leggono più; ho scritto i link CSV in costanti in cima ai due file JavaScript, pronti da sostituire con gli indirizzi reali del foglio.
- **Che cosa ho scartato:** non ho usato un database o un backend; non ho chiesto al browser di leggere il RSS di ANSA direttamente; non ho cambiato la struttura del menu e delle pagine; non ho inserito nel sito contenuti non verificati dal feed.
- **Come ho verificato:** ho preparato i due CSV dal JSON esistente per importarli nel foglio; ho controllato che il codice gestisca CSV vuoti, CSV non raggiungibili e `sede_id` senza corrispondenza; ho tenuto l'errore del meteo e delle notizie dentro i rispettivi riquadri. La verifica con i link CSV reali resta da fare dopo aver pubblicato il foglio.
- **Problemi e soluzioni:** il browser non può aprire il feed RSS di un altro sito per CORS, quindi il foglio importa il feed dal lato Google e lo ripubblica come CSV; nel CSV tutti i valori sono testo, quindi `"1"` e `1` non si paragonano con uguaglianza stretta: vanno confrontati come stringhe dopo il trim.
