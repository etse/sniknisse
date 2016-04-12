import { Component } from 'angular2/core';
import { Http } from 'angular2/http';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {NgFor} from "angular2/common";
import { Backend } from '../services/backend';

@Component({
    selector: 'nisse-list-registered',
    directives: [NgFor, ROUTER_DIRECTIVES],
    template: `
        <img class="image-right hidden-mobile" src="./images/christmas-tree.png" />
        <div class="container-inline">
            <div class="text-center blokk-s" *ngIf="showSpinner">
                <img class="text-center" src='./images/spinner.gif' />
            </div>
            <h2 class="blokk-m">Vi har {{users.length}} personer påmeldt</h2>
            <ul class="blokk-l">
                <li *ngFor="#user of users">{{user.name}}</li>
            </ul>
            
            <div class="text-center">
                <p><a [routerLink]="['/Registration']" class="button-snow knapp-liten">Meld deg på</a></p>
                <p><a [routerLink]="['/Intro']">Tilbake til forsiden</a></p>
            </div>
        </div>
    `
})
export class ListRegistered {
    users: any;
    showSpinner: boolean;
    backend: Backend;
    
    constructor(http:Http) {
        this.backend = new Backend(http);
        this.users = [];
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
