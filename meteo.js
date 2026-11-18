// Meteo di Torino adesso, letto da Open-Meteo con una sola richiesta.
// Se la richiesta fallisce, il messaggio d'errore resta nel solo riquadro:
// il resto della pagina continua a funzionare.

const boxMeteo = document.getElementById("meteo-box");

const URL_METEO =
  "https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869" +
  "&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome";

function mostraErrore() {
  boxMeteo.replaceChildren();
  const messaggio = document.createElement("p");
  messaggio.className = "stato-messaggio stato-errore";
  messaggio.textContent = "Il meteo non è disponibile in questo momento. Riprova più tardi.";
  boxMeteo.append(messaggio);
}

function formattaOra(ora) {
  if (!ora) return "";
  // Risposta tipo "2026-11-18T15:45": si mostra solo l'orario.
  const parte = String(ora).split("T")[1];
  return parte ? parte.slice(0, 5) : ora;
}

function mostraDati(dati) {
  const corrente = dati.current;
  if (!corrente || corrente.temperature_2m == null || corrente.wind_speed_10m == null) {
    mostraErrore();
    return;
  }

  boxMeteo.replaceChildren();

  const temperatura = document.createElement("p");
  temperatura.className = "meteo-temperatura";
  temperatura.textContent = Math.round(corrente.temperature_2m) + " °C";

  const vento = document.createElement("p");
  vento.className = "event-meta";
  vento.textContent = "Vento: " + Math.round(corrente.wind_speed_10m) + " km/h";

  const ora = document.createElement("p");
  ora.className = "event-place";
  ora.textContent = "Dato delle ore " + formattaOra(corrente.time) + " (fuso orario di Roma).";

  boxMeteo.append(temperatura, vento, ora);
}

async function caricaMeteo() {
  try {
    const risposta = await fetch(URL_METEO);
    if (!risposta.ok) {
      throw new Error("HTTP " + risposta.status);
    }
    const dati = await risposta.json();
    mostraDati(dati);
  } catch (errore) {
    mostraErrore();
  }
}

caricaMeteo();
