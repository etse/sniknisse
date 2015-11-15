import {Component, View} from 'angular2/angular2';

@Component({
	selector: 'nisse-introduction'
})
@View({
    template: `
        <p>Her skal vi ha en forklaring av hva sniknisse er</p>
        <p>Om du ønsker å være med, er det bare å registrere seg her.</p>
    `
})
export class Introduction {	
	constructor() {
	}
}
