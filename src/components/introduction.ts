import {Component, View} from 'angular2/angular2';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'nisse-introduction'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    template: `
        <p class="blokk-m">
            Nå begynner vi å nærme oss jul, og ingen ordentlig jul uten en
            sniknisse. Og i den ammenheng tenkte jeg å ta på meg ansvaret
            for å arrangere et event for de av oss i BEKK som jobber hos NAV.
        </p>
        <p class="blokk-l">
            Sniknisse er en vestlig tradisjon hvor en gruppe mennesker går
            sammen og avtaler at de skal kjøpe gaver til hverandre. Hvem du
            skal kjøpe blir gave til blir valgt tilfeldig – og mottakeren skal
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
            <li>Pakkene leveres inn til meg senest <strong>torsdag 10. desember</strong></li>
            <li>Utleveringen skjer fredag 11. desember</li>
        </ol>
        
        <div class="text-center">
            <p><a [router-link]="['/Registration']" class="button-snow">Meld deg på</a></p>
            <p><a [router-link]="['/ListRegistered']">Se hvem som har meldt seg på</a></p>
        </p>
    `
})
export class Introduction {	
	constructor() {
	}
}