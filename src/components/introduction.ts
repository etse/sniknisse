import {ROUTER_DIRECTIVES, RouterLink} from 'angular2/router';
import {Component} from "angular2/core";

@Component({
	selector: 'nisse-introduction',
	directives: [ROUTER_DIRECTIVES],
	template: `
        <p class="blokk-m">
            Nå begynner vi å nærme oss jul, og ingen ordentlig jul uten en
            sniknisse. Og i den sammenheng tenkte jeg å ta på meg ansvaret
            for å arrangere et event for de av oss i BEKK som jobber hos NAV.
        </p>
        <p class="blokk-l">
            Sniknisse er en vestlig tradisjon hvor en gruppe mennesker går
            sammen og avtaler at de skal kjøpe gaver til hverandre. Hvem du
            skal kjøpe gave til blir valgt tilfeldig – og mottakeren skal
            ikke vite hvem som kjøpte gave til dem.
        </p>
        
        <h2>Prosessen vil skje på følgende måte:</h2>
        <ol class="blokk-xl">
            <li>Folk melder seg på innen søndag 29. november</li>
            <li>Mandag 30. november blir så tildelt en tilfeldig person du skal kjøpe pakke til</li>
            <li>Du logger inn på denne siden og sjekker hvem du er sniknissen til</li>
            <li>Man ordner en gave til en verdi rundt 100-150 kroner</li>
            <li>Pakken skal selvfølgelig pakkes inn, husk å skrive på hvem
                pakken er til, og sett "sniknissen" i frafeltet</li>
            <li>Pakkene leveres inn til Steffen senest <strong>onsdag 9. desember</strong>. (Jeg sitter i WT)</li>
            <li>Utleveringen skjer torsdag 10. desember, etter prosjektlunsjen</li>
        </ol>
        
        <div class="text-center">
            <p><a [routerLink]="['/Login']" class="button-snow knapp-stor">Logg inn</a></p>
        </div>
    `
})
export class Introduction {	
	constructor() {
	}
}
