// Programma generato dai dati di un foglio Google pubblicato in CSV:
// le schede sono costruite da eventi.csv e sedi.csv.
// Le due liste sono collegate tramite Evento.sede_id -> Sede.id.
// Nel CSV ogni valore è testo: id e sede_id vanno confrontati come stringhe.

// Indirizzi CSV pubblicati dal foglio «Segnale — dati».
// Sostituire con i link reali di File > Condividi > Pubblica sul web (formato CSV).
const INDIRIZZO_EVENTI = "INSERISCI_INDIRIZZO_CSV_EVENTI";
const INDIRIZZO_SEDI = "INSERISCI_INDIRIZZO_CSV_SEDI";

const griglia = document.getElementById("griglia-eventi");

const GIORNI = {
  "2026-06-12": "Venerdì 12 giugno",
  "2026-06-13": "Sabato 13 giugno",
};

function formattaData(data) {
  return GIORNI[data] || data;
}

function normale(valore) {
  return String(valore == null ? "" : valore).trim();
}

function cercaSede(sedi, sedeId) {
  const cercata = normale(sedeId);
  return sedi.find((sede) => normale(sede.id) === cercata) || null;
}

function costruisciScheda(evento, sede) {
  const scheda = document.createElement("article");
  scheda.className = "event-card";

  const img = document.createElement("img");
  img.src = evento.immagine;
  img.alt = evento.immagine_alt || "";
  img.width = 900;
  img.height = 600;

  const corpo = document.createElement("div");
  corpo.className = "event-body";

  const meta = document.createElement("p");
  meta.className = "event-meta";
  meta.textContent = `${formattaData(evento.data)} · ${evento.orario} · ${evento.categoria}`;

  const titolo = document.createElement("h3");
  titolo.textContent = evento.titolo;

  const descrizione = document.createElement("p");
  descrizione.textContent = evento.descrizione;

  const luogo = document.createElement("p");
  luogo.className = "event-place";
  const nomeSede = sede ? sede.nome : "Sede da definire";
  luogo.innerHTML = "<strong>Sede:</strong> " + nomeSede;

  corpo.append(meta, titolo, descrizione, luogo);
  scheda.append(img, corpo);
  return scheda;
}

function mostraMessaggio(testo, classe) {
  griglia.replaceChildren();
  const messaggio = document.createElement("p");
  messaggio.className = "stato-messaggio " + classe;
  messaggio.textContent = testo;
  griglia.append(messaggio);
}

// Legge un CSV pubblicato dal foglio e restituisce l'elenco di oggetti.
function caricaCsv(indirizzo) {
  return new Promise((resolve, reject) => {
    Papa.parse(indirizzo, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (risultato) => {
        if (risultato.errors && risultato.errors.length > 0 && risultato.data.length === 0) {
          reject(new Error("CSV non leggibile"));
          return;
        }
        resolve(risultato.data);
      },
      error: (errore) => reject(errore),
    });
  });
}

async function generaProgramma() {
  let eventi;
  let sedi;

  try {
    [eventi, sedi] = await Promise.all([
      caricaCsv(INDIRIZZO_EVENTI),
      caricaCsv(INDIRIZZO_SEDI),
    ]);
  } catch (errore) {
    mostraMessaggio("Il programma non è disponibile: riprova più tardi.", "stato-errore");
    return;
  }

  if (!Array.isArray(eventi) || eventi.length === 0) {
    mostraMessaggio("Nessun evento in programma.", "stato-vuoto");
    return;
  }

  griglia.replaceChildren();
  eventi.forEach((evento) => {
    const sede = cercaSede(sedi, evento.sede_id);
    griglia.append(costruisciScheda(evento, sede));
  });
}

generaProgramma();
