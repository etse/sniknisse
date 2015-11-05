import { Component, View, bootstrap, provide, Inject } from 'angular2/angular2';
import { HTTP_PROVIDERS, Http } from 'angular2/http';
import { 
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES, 
    RouteConfig,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';

import { Introduction } from '../introduction/introduction';
import {Backend} from "../../services/backend";

@Component({
	selector: 'nisse-app'
})
@View({
	templateUrl: './components/app/app.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    { path: '/', component: Introduction, as: 'Intro' }
])
class App {	
	constructor(@Inject(Http) http: Http) {
        const backend:Backend = new Backend(http);
        backend.customObservable().toRx().subscribe((value) => console.log(value));
	}
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
