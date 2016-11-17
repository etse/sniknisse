import {Component} from '@angular/core';

@Component({
	selector: 'nisse-app',
    template: `
        <div class="container container-hoved">
            <h1>Sniknisse!</h1>
            <router-outlet></router-outlet>
        </div>
    `
})
export class App {
	constructor() {
	}
}