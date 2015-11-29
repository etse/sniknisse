import { Component, View, bootstrap, provide } from 'angular2/angular2';
import { HTTP_PROVIDERS } from 'angular2/http';
import { 
    ROUTER_PROVIDERS,
    ROUTER_DIRECTIVES, 
    RouteConfig,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';

import { Introduction } from './introduction';
import { ListRegistered } from './list-registered';
import { RegistrationForm } from './registration-form';
import { Profile } from "./profile";
import { Login } from "./login";
import { Admin } from "./admin";

@Component({
	selector: 'nisse-app'
})
@View({
    directives: [ROUTER_DIRECTIVES],
    template: `
        <div class="container container-hoved">
            <h1>Sniknisse!</h1>
            <router-outlet></router-outlet>
        </div>
    `
})
@RouteConfig([
    { path: '/', component: Introduction, as: 'Intro' },
    { path: '/profile', component: Profile, as: 'Profile' },
    { path: '/login', component: Login, as: 'Login' },
    { path: '/admin', component: Admin, as: 'Admin' }
])
class App {	
	constructor() {
	}
}

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
