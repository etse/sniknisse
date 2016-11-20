import {Component} from "@angular/core";

@Component({
	selector: 'nisse-introduction',
	template: `
        <p class="blokk-m">
            Nå begynner vi å nærme oss jul, og ingen ordentlig jul uten en
            sniknisse. Og i den sammenheng tenkte jeg å ta på meg ansvaret
            for å arrangere et event for de av oss som jobber hos NAV.
        </p>
        <p class="blokk-m">
        	Nytt av året er at vi sitter på 2 ulike steder; grünerløkka og hasle.
        	Begge stede vil være med, det vil opperere litt uavhengig - og man vil
        	få tildelt et nissebarn som er på samme lokasjon.
		</p>
        <p class="blokk-l">
            Sniknisse er en vestlig tradisjon hvor en gruppe mennesker går
            sammen og avtaler at de skal kjøpe gaver til hverandre. Hvem du
            skal kjøpe gave til blir valgt tilfeldig – og mottakeren skal
            ikke vite hvem som kjøpte gave til dem.
        </p>
        
        <h2>Prosessen vil skje på følgende måte:</h2>
        <ol class="blokk-xl">
            <li>Folk melder seg på innen fredag 25. november 15:00</li>
            <li>Fredag 25. november klokken 15:00 blir så tildelt en tilfeldig person du skal kjøpe pakke til</li>
            <li>Du logger inn på denne siden og sjekker hvem du er sniknissen til</li>
            <li>Man ordner en gave til en verdi rundt 100-150 kroner</li>
            <li>Pakken skal selvfølgelig pakkes inn, husk å skrive på hvem
                pakken er til, og sett "sniknissen" i frafeltet</li>
            <li>Innlevering av pakker:
            	<ul>
            		<li>Folk i S2/WT leverer til Steffen i WT senest <strong>før lønsj onsdag 14. desember</strong></li>
            		<li>Folk på hasle leverer til Knut <strong>innen 1. desember</strong></li>
				</ul>
            </li>
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
