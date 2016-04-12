import {Component} from 'angular2/core';
import { Http } from 'angular2/http';
import { Router } from 'angular2/router';
import {Backend} from '../services/backend';

export interface IUser {
    id: number,
    nissebarn: number,
    harlevert: boolean
}

@Component({
    selector: 'nisse-admin',
    template: `
        <div class="container">
            <h2>Admin panel</h2>
            <div *ngIf="!harTildeltNissebarn()">
                <button (click)="tildelNissebarn()">Tildel nissebarn</button>
            </div>

            <ul class="liste-klikkbar" *ngIf="harTildeltNissebarn()">
                <li *ngFor="#user of users" (click)="toggleLevert(user)">
                    <img *ngIf="user.harlevert" src="./images/checked.png" class="levert-icon" />
                    <img *ngIf="!user.harlevert" src="./images/cross.png" class="levert-icon" />
                    <span>{{user.name}}</span>
                </li> 
            </ul>
        </div>
    `
})
export class Admin {
    backend: Backend;
    users: IUser[];

    constructor(http: Http, private router: Router) {
        this.backend = new Backend(http);
        this.hentAlleBrukere();
    }

    harTildeltNissebarn(): boolean {
        return (this.users != null && this.users[0].nissebarn != null);
    }

    tildelNissebarn(){
        this.backend.delUtNissebarn().subscribe(() => {
            this.hentAlleBrukere();
        });
    }

    toggleLevert(user: IUser) {
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
