import {Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/distinctUntilChanged';

declare var ga: any;

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
	constructor(public router: Router) {
		router.events.distinctUntilChanged((previous: any, current: any) => {
			if(current instanceof NavigationEnd) {
				return previous.url === current.url;
			}
			return true;
		}).subscribe((x: any) => {
			ga('send', 'pageview', x.url);
		});
	}
}