# Inventario Panineria da Andrea

Sito per fare l'inventario settimanale dallo smartphone (o dal PC): si segna categoria per categoria cosa è rimasto (e quanto) o cosa è finito, e alla fine si genera in un tocco il messaggio pronto da copiare o aprire direttamente su WhatsApp.

`index.html` contiene tutto il sito (HTML, CSS, JS). `api/inventory.js` è l'unica funzione serverless: legge/scrive l'inventario condiviso su Redis (Upstash), così tutti i dispositivi vedono sempre la stessa lista.

## Sviluppo locale

```
npx vercel dev
```

(serve `vercel dev` e non un semplice server statico, perché usa la funzione in `api/`)

## Dati condivisi (Upstash Redis)

1. Crea un database gratuito su [upstash.com](https://upstash.com) (tipo Redis).
2. Nella pagina del database, sezione "REST API", copia `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`.
3. Su Vercel: Project → Settings → Environment Variables → aggiungi queste due variabili (Production).
4. Fai un redeploy perché le nuove variabili abbiano effetto.

Ogni dispositivo legge/scrive lo stesso inventario tramite `/api/inventory?dept=...`; un valore in cache locale (`localStorage`) permette al sito di continuare a funzionare anche offline momentaneamente. In modalità "Modifica lista" (icona matita) sono disponibili anche "Esporta lista" e "Importa lista" per un backup/ripristino manuale in JSON, e "Svuota inventario" per azzerare i valori a inizio settimana.

## Reparti (Cucina / Cassieri)

Il sito ha due liste completamente separate ("reparti"), selezionabili dalle due schede in alto: **Cucina** e **Cassieri**. Ognuna ha le proprie categorie, ingredienti e messaggio WhatsApp, salvate su chiavi diverse in Redis (`inventario-panineria-state` per Cucina, per compatibilità con i dati già esistenti; `inventario-panineria-state-cassieri` per Cassieri). L'URL riflette il reparto attivo (`?dept=cucina` o `?dept=cassieri`), quindi si può anche salvare un collegamento diretto a un reparto sulla schermata home del telefono.

## Deploy

Pubblicato su Vercel: sito statico + una funzione serverless in `api/`, zero configurazione oltre alle variabili d'ambiente sopra.
