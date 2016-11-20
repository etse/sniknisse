import {Component, NgModule} from '@angular/core';
import { Router } from '@angular/router';
import {Backend} from '../services/backend';

export interface IUser {
    id: number;
    nissebarn: number;
    harlevert: boolean;
    lokasjon: number;
}

@Component({
    selector: 'nisse-admin',
    providers: [Backend],
    template: `
        <div class="container">
            <h2>Admin panel</h2>
            <div *ngIf="!harTildeltNissebarn()">
                <button (click)="tildelNissebarn()">Tildel nissebarn</button>
            </div>

            <div class="blokk-m">
                <ul class="liste-klikkbar" *ngIf="harTildeltNissebarn()">
                    <h3>S2/WT</h3>
                    <li *ngFor="let user of usersS2WT" (click)="toggleLevert(user)">
                        <img *ngIf="user.harlevert" src="./images/checked.png" class="levert-icon" />
                        <img *ngIf="!user.harlevert" src="./images/cross.png" class="levert-icon" />
                        <span>{{user.name}}</span>
                    </li> 
                </ul>
            </div>
            
            <ul class="liste-klikkbar" *ngIf="harTildeltNissebarn()">
                <h3>Hasle</h3>
                <li *ngFor="let user of usersHasle" (click)="toggleLevert(user)">
                    <img *ngIf="user.harlevert" src="./images/checked.png" class="levert-icon" />
                    <img *ngIf="!user.harlevert" src="./images/cross.png" class="levert-icon" />
                    <span>{{user.name}}</span>
                </li> 
            </ul>
        </div>
    `
})
@NgModule({
    imports: [Backend]
})
export class Admin {
    usersHasle: IUser[];
    usersS2WT: IUser[];

    constructor(private router: Router, private backend: Backend) {
        this.hentAlleBrukere();
    }

    harTildeltNissebarn(): boolean {
        return (this.usersS2WT != null && this.usersS2WT[0].nissebarn != null);
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
                this.router.navigate(['login']);
            }
        });
    }

    private hentAlleBrukere() {
        this.backend.getAllUsers()
            .subscribe(response => {
                const users = response.json() as IUser[];
                if(users[0].id != null){
                    this.usersHasle = users.filter(user => user.lokasjon == 2);
                    this.usersS2WT = users.filter(user => user.lokasjon == 1);
                } else {
                    this.router.navigate(['login']);
                }
            });
    }
}
