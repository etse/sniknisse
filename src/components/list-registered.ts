import { Component } from '@angular/core';
import { Backend } from '../services/backend';

@Component({
    selector: 'nisse-list-registered',
    providers: [Backend],
    template: `
        <img class="image-right hidden-mobile" src="./images/christmas-tree.png" />
        <div class="container-inline">
            <div class="text-center blokk-s" *ngIf="showSpinner">
                <img class="text-center" src='./images/spinner.gif' />
            </div>
            <h2 class="blokk-m">Vi har {{users.length}} personer påmeldt</h2>
            <ul class="blokk-l">
                <li *ngFor="let user of users">{{user.name}} - {{user.lokasjon == 1 ? "S2/WT" : "Hasle"}}</li>
            </ul>
            
            <div class="text-center">
                <p><a routerLink="/register" class="button-snow knapp-liten">Meld deg på</a></p>
                <p><a routerLink="/intro">Tilbake til forsiden</a></p>
            </div>
        </div>
    `
})
export class ListRegistered {
    users: any;
    showSpinner: boolean;

    constructor(backend: Backend) {
        this.users = [];
        this.showSpinner = true;
        backend.getAllUsers().subscribe(response => {
            if(response.status === 200) {
                this.users = response.json();
                this.showSpinner = false;
            } else {
                console.error(response);
            }
        });
    }
}
