import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { Http } from 'angular2/http';
import { Backend } from "../services/backend";
import {FORM_DIRECTIVES, NgIf, ControlGroup, Validators, Control} from "angular2/common";
import {Component, Inject} from "angular2/core";

@Component({
    selector: 'nisse-login',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, NgIf],
    template: `
        <img class="image-right hidden-mobile" src="./images/santa.png" />
        <div class="container">
            <form (submit)="login($event)" [ngFormModel]="loginForm" novaldiate >
                <p class="form-error" *ngIf="hasError">Ugyldig brukernavn eller passord</p>
                <div class="blokk-s">
                    <label for="email">Din epost:</label>
                    <input id="email" ngControl="email" type="text" placeholder="navn@bekk.no" />
                </div>           
                <div class="blokk-m">
                    <label for="password">Ditt passord:</label>
                    <input id="password" ngControl="password" type="password" placeholder="Passord" />
                </div>
                <div class="text-center container-inline">
                    <button class="knapp-submit" type="submit" [disabled]="!loginForm.valid || isLoggingIn">Logg inn</button>
                    <a [routerLink]="['/Intro']">Avbryt</a>
                </div>
            </form>
        </div>
    `
})
export class Login {
    backend: Backend;
    hasError: boolean;
    isLoggingIn: boolean;
    loginForm: ControlGroup;

    constructor(@Inject(Http) http: Http, @Inject(Router) private router:Router) {
        this.backend = new Backend(http);
        this.hasError = false;
        this.isLoggingIn = false;

        this.loginForm = new ControlGroup({
            email: new Control('', Validators.required),
            password: new Control('', Validators.required)
        });
    }

    login() {
        if(this.loginForm.valid) {
            let email = this.loginForm.controls['email'].value;
            let password = this.loginForm.controls['password'].value;
            this.backend.login(email, password).subscribe(response => {
                if (response.status === 200) {
                    this.router.navigate(['/Profile']);
                } else {
                    this.hasError = true;
                    this.isLoggingIn = false;
                }
            });
        }
    }
}