import { Component, View, bootstrap, bind, Inject } from 'angular2/angular2';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import { 
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES, 
    RouteConfig,
    LocationStrategy, 
    HashLocationStrategy 
} from 'angular2/router';

import { Introduction } from '../introduction/introduction';
import { Backend } from '../../services/backend';

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
    backend: Backend;
	constructor(@Inject(Http) http:Http) {
        this.backend = new Backend(http);
        this.backend.getTest()
            .subscribe(
                data => console.log("Data is: ", data.json()),
                err => console.log(err)
            );
	}
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy)
]);
