import { Component, View, Inject, NgFor, NgIf } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Backend } from '../services/backend';

@Component({
    selector: 'nisse-list-registered'
})
@View({
    directives: [NgFor, ROUTER_DIRECTIVES],
    template: `
        <img class="image-right hidden-mobile" src="./images/christmas-tree.png" />
        <div class="container-inline">
            <div class="text-center blokk-s" *ng-if="showSpinner">
                <img class="text-center" src='./images/spinner.gif' />
            </div>
            <h2 class="blokk-m">Vi har {{users.length}} personer påmeldt</h2>
            <ul class="blokk-l">
                <li *ng-for="#user of users">{{user.name}}</li>
            </ul>
            
            <div class="text-center">
                <p><a [router-link]="['/Registration']" class="button-snow knapp-liten">Meld deg på</a></p>
                <p><a [router-link]="['/Intro']">Tilbake til forsiden</a></p>
            </div>
        </div>
    `
})
export class ListRegistered {
    users: any;
    showSpinner: boolean;
    backend: Backend;
    
    constructor(@Inject(Http) http) {
        this.backend = new Backend(http);
        this.showSpinner = true;
        this.backend.getAllUsers().subscribe(response => {
            if(response.status === 200) {
                this.users = response.json();
                this.showSpinner = false;
            } else {
                console.error(response);
            }
        });
    }
}
