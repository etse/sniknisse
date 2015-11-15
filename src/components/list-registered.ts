import { Component, View, Inject, NgFor } from 'angular2/angular2';
import { Http } from 'angular2/http';

import { Backend } from '../services/backend';

@Component({
    selector: 'nisse-list-registered'
})
@View({
    directives: [NgFor],
    template: `
        <h2>Liste over registrerte personer</h2>
        <ul>
            <li *ng-for="#user of users">{{user.name}}</li>
        </ul>
    `
})
export class ListRegistered {
    users: Object;
    backend: Backend;
    
    constructor(@Inject(Http) http) {
        this.backend = new Backend(http);
        this.backend.getAllUsers().subscribe(response => {
            if(response.status === 200) {
                this.users = response.json();
                console.log(this.users);
            }
        });
    }
}
