// Notizie da Torino: lette dal foglio Google pubblicato in CSV (scheda «notizie»),
// perché il browser non può leggere direttamente il feed RSS di un altro sito (CORS).
// La richiesta non riesce: il messaggio resta nel solo riquadro, il resto della Home funziona.

const lista = document.getElementById("notizie-lista");

// Indirizzo CSV della scheda «notizie» pubblicata dal foglio.
// Sostituire con il link reale di File > Condividi > Pubblica sul web (formato CSV).
const INDIRIZZO_NOTIZIE = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTffp6mOPqalhNTgyllNbF8r138hjADZeo11V9Sam_-Px3d_a9zOl7WmH27CKgOlTo14CV48sJ4Qqt5/pub?gid=2068658669&single=true&output=csv";

const MAX_NOTIZIE = 5;

function mostraErrore() {
  lista.replaceChildren();
  const messaggio = document.createElement("p");
  messaggio.className = "stato-messaggio stato-errore";
  messaggio.textContent = "Le notizie non sono disponibili in questo momento. Riprova più tardi.";
  lista.append(messaggio);
}

function formattaData(dataTesto) {
  const data = new Date(String(dataTesto || "").trim());
  if (Number.isNaN(data.getTime())) {
    return String(dataTesto || "").trim();
  }
  return data.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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

function costruisciNotizia(notizia) {
  const voce = document.createElement("li");
  voce.className = "news-item";

  const link = document.createElement("a");
  link.href = notizia.link || "#";
  link.textContent = notizia.titolo || "Titolo mancante";
  if (!notizia.link) {
    link.removeAttribute("href");
  }

  const data = document.createElement("span");
  data.className = "news-data";
  data.textContent = formattaData(notizia.data);

  voce.append(link, document.createElement("br"), data);
  return voce;
}

async function caricaNotizie() {
  let notizie;
  try {
    notizie = await caricaCsv(INDIRIZZO_NOTIZIE);
  } catch (errore) {
    mostraErrore();
    return;
  }

  if (!Array.isArray(notizie) || notizie.length === 0) {
    lista.replaceChildren();
    const messaggio = document.createElement("p");
    messaggio.className = "stato-messaggio stato-vuoto";
    messaggio.textContent = "Nessuna notizia disponibile.";
    lista.append(messaggio);
    return;
  }

  lista.replaceChildren();
  const elenco = document.createElement("ul");
  notizie.slice(0, MAX_NOTIZIE).forEach((notizia) => {
    elenco.append(costruisciNotizia(notizia));
  });
  lista.append(elenco);
}

caricaNotizie();
