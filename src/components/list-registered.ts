import { Component } from '@angular/core';
import { Backend } from '../services/backend';
import {IUser} from "./admin";

@Component({
    selector: 'nisse-list-registered',
    providers: [Backend],
    template: `
        <img class="image-right hidden-mobile" src="./images/christmas-tree.png" />
        <div class="container-inline">
            <div class="text-center blokk-s" *ngIf="showSpinner">
                <img class="text-center" src='./images/spinner.gif' />
            </div>
            
            <h2 class="blokk-m">Påmeldte på S2/WT ({{usersS2.length}})</h2>
            <ul class="blokk-l">
                <li *ngFor="let user of usersS2">{{user.name}}</li>
            </ul>
            
            <h2 class="blokk-m">Påmeldte på Hasle ({{usersHasle.length}})</h2>
            <ul class="blokk-l">
                <li *ngFor="let user of usersHasle">{{user.name}}</li>
            </ul>
            
            <div class="text-center">
                <p><a routerLink="/register" class="button-snow knapp-liten">Meld deg på</a></p>
                <p><a routerLink="/intro">Tilbake til forsiden</a></p>
            </div>
        </div>
    `
})
export class ListRegistered {
    usersS2: IUser[] = [];
    usersHasle: IUser[] = [];
    showSpinner: boolean;

    constructor(backend: Backend) {
        this.showSpinner = true;
        backend.getAllUsers().subscribe(response => {
            if(response.status === 200) {
                const users: IUser[] = response.json();
                this.usersS2 = users.filter(user => user.lokasjon == 1);
                this.usersHasle = users.filter(user => user.lokasjon == 2);
                this.showSpinner = false;
            } else {
                console.error(response);
            }
        });
    }
}
