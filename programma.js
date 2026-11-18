// Programma generato dai dati: le schede sono costruite da eventi.json e sedi.json.
// Le due liste sono collegate tramite Evento.sede_id -> Sede.id.

const griglia = document.getElementById("griglia-eventi");
const stato = document.getElementById("stato-eventi");

const GIORNI = {
  "2026-06-12": "Venerdì 12 giugno",
  "2026-06-13": "Sabato 13 giugno",
};

function formattaData(data) {
  return GIORNI[data] || data;
}

function cercaSede(sedi, sedeId) {
  return sedi.find((sede) => sede.id === sedeId) || null;
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

async function caricaJson(percorso) {
  const risposta = await fetch(percorso);
  if (!risposta.ok) {
    throw new Error("HTTP " + risposta.status);
  }
  return risposta.json();
}

async function generaProgramma() {
  let eventi;
  let sedi;

  try {
    [eventi, sedi] = await Promise.all([
      caricaJson("dati/eventi.json"),
      caricaJson("dati/sedi.json"),
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
