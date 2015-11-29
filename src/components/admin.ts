import { Component, View, Inject } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { Router } from 'angular2/router';
import { Backend } from '../services/backend';

@Component({
    selector: 'nisse-admin'
})
@View({
    template: `
        <div class="container">
            <h2>Admin panel</h2>
            <div *ng-if="!harTildeltNissebarn()">
                <button (click)="tildelNissebarn()">Tildel nissebarn</button>
            </div>

            <ul class="liste-klikkbar" *ng-if="harTildeltNissebarn()">
                <li *ng-for="#user of users" (click)="toggleLevert(user)">
                    <img *ng-if="user.harlevert" src="./images/checked.png" class="levert-icon" />
                    <img *ng-if="!user.harlevert" src="./images/cross.png" class="levert-icon" />
                    <span>{{user.name}}</span>
                </li> 
            </ul>
        </div>
    `
})
export class Admin {
    backend: Backend;
    users: any;

    constructor(http: Http, private router: Router) {
        this.backend = new Backend(http);
        this.hentAlleBrukere();
    }

    harTildeltNissebarn(): boolean {
        return (this.users != null && this.users[0].nissebarn != null);
    }

    tildelNissebarn(){
        this.backend.delUtNissebarn().subscribe(response => {
            this.hentAlleBrukere();
        });
    }

    toggleLevert(user) {
        this.backend.settLevert(user.id, !user.harlevert).subscribe(response => {
            if(response.status === 200) {
                user.harlevert = !user.harlevert;
            } else if(response.status === 403) {
                this.router.navigate(['/Login']);
            }
        });
    }

    private hentAlleBrukere() {
        this.backend.getAllUsers().subscribe(response => {
            var users = response.json();
            if(users[0].id != null){
                this.users = users;
            } else {
                this.router.navigate(['/Login']);
            }
        });
    }
}
