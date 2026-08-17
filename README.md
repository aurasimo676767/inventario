# Check Scorte

Sito per fare l'inventario settimanale del locale dallo smartphone: segni categoria per categoria cosa è rimasto (e quanto) o cosa è finito, e alla fine generi in un tocco il messaggio pronto da copiare o aprire direttamente su WhatsApp.

Sito statico, nessuna build necessaria: `index.html` contiene tutto (HTML, CSS, JS).

## Sviluppo locale

Basta aprire `index.html` nel browser, oppure servirlo con un server statico qualsiasi, ad esempio:

```
npx serve .
```

## Dati

La lista di categorie/ingredienti e i valori inseriti restano salvati nel browser del dispositivo usato (`localStorage`). In modalità "Modifica lista" (icona matita) sono disponibili anche "Esporta lista" e "Importa lista" per fare un backup/ripristino manuale in formato JSON.

## Deploy

Pubblicato su Vercel come sito statico, senza configurazione: basta collegare questo repository.
