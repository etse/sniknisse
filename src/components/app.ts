import {Component} from 'angular2/core';
import {
    ROUTER_DIRECTIVES,
    RouteConfig,
} from 'angular2/router';

import { Introduction } from './introduction';
import { ListRegistered } from './list-registered';
import { RegistrationForm } from './registration-form';
import { Profile } from "./profile";
import { Login } from "./login";
import { Admin } from "./admin";

@Component({
	selector: 'nisse-app',
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
    { path: '/register', component: RegistrationForm, as: 'Registration' },
    { path: '/registrerte', component: ListRegistered, as: 'ListRegistered' },
    { path: '/admin', component: Admin, as: 'Admin' }
])
export class App {
	constructor() {
	}
}