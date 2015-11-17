import { Component, View, Inject, NgFor } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Backend } from '../services/backend';

@Component({
    selector: 'nisse-list-registered'
})
@View({
    directives: [NgFor, ROUTER_DIRECTIVES],
    template: `
        <div class="container-inline">
            <h2 class="blokk-m">Vi har X personer påmeldt</h2>
            <ul class="blokk-xl">
                <li *ng-for="#user of users">{{user.name}}</li>
            </ul>
            
            <div class="text-center">
                <p><a [router-link]="['/Registration']" class="button-snow">Meld deg på</a></p>
                <p><a [router-link]="['/Intro']">Tilbake til forrsiden</a></p>
            </div>
        </div>
    `
})
export class ListRegistered {
    users: any;
    backend: Backend;
    
    constructor(@Inject(Http) http) {
        this.backend = new Backend(http);
        this.backend.getAllUsers().subscribe(response => {
            if(response.status === 200) {
                this.users = response.json();
            } else {
                console.error(response);
            }
        });
    }
    
    harPaameldte() :Boolean {
        return this.users !== null && this.users.length > 0;
    }
}
