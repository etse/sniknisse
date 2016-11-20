# sniknisse

## Sette opp utviklingsmiljø
For å jobbe lokalt anbefaler jeg å bruke Vagrant, men at man kjører bygging lokalt. Du må derfor ha Vagrant, node og npm installert.

Bygg applikasjonen med `gulp`, og for å starte en server skriv `vagrant up`. Dette vil starte en node-express server på port 3000, samt en postgresdatabase som den tar i bruk.

## Kjøring på heroku
Sett opp en postgres-database med tabeller fra filen `./server/tabledefs.sql`. Og sett opp følgende miljøvariabler i heroke:
* **DATABASE_URL**: URL til databasen, med brukernavn og passord.
* **NODE_ENV**: Sett til production for å skru på minifisering av kode.
* Sørg for at node starter opp appliasjonen som npm-web-script. (altså kjører `npm install` og `npm start`).

By default er de 2 første brukerene som registrere seg å regne som admins. Dette kan endret i ´./server/routes/index.js` om ønskelig. 

