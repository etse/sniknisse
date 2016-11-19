import {Component} from "@angular/core";

@Component({
	selector: 'nisse-introduction',
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
            <li>Folk melder seg på innen søndag 27. november</li>
            <li>Mandag 28. november blir så tildelt en tilfeldig person du skal kjøpe pakke til</li>
            <li>Du logger inn på denne siden og sjekker hvem du er sniknissen til</li>
            <li>Man ordner en gave til en verdi rundt 100-150 kroner</li>
            <li>Pakken skal selvfølgelig pakkes inn, husk å skrive på hvem
                pakken er til, og sett "sniknissen" i frafeltet</li>
            <li>Pakkene leveres inn senest til lunsj <strong>onsdag 14. desember</strong>
            	<ul>
            		<li>Folk i S2/WT leverer til Steffen i WT</li>
            		<li>Folk på hasle leverer til Knut</li>
				</ul>
            
            </li>
            <li>Utleveringen skjer onsdag 14. desember</li>
        </ol>
        
        <div class="text-center">
            <p><a routerLink="/register" class="button-snow knapp-stor">Meld deg på</a></p>
            <p><a routerLink="/login">Logg inn</a></p>
            <p><a routerLink="/registrerte">Se hvem som har meldt seg på</a></p>
        </div>
    `
})
export class Introduction {	
	constructor() {
	}
}
