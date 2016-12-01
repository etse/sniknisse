import { Router } from '@angular/router';
import {Component} from "@angular/core";
import { Backend } from "../services/backend";
import {FormGroup, FormBuilder} from "@angular/forms";

declare var ga: any;

@Component({
    selector: 'nisse-login',
    providers: [Backend],
    template: `
        <img class="image-right hidden-mobile" src="./images/santa.png" />
        <div class="container">
            <form (submit)="login($event)" [formGroup]="loginForm" novaldiate >
                <p class="form-error" *ngIf="hasError">Ugyldig brukernavn eller passord</p>
                <div class="blokk-s">
                    <label for="email">Din epost:</label>
                    <input id="email" formControlName="email" type="text" placeholder="navn@bekk.no" />
                </div>           
                <div class="blokk-m">
                    <label for="password">Ditt passord:</label>
                    <input id="password" formControlName="password" type="password" placeholder="Passord" />
                </div>
                <p *ngIf="loginForm.pristine && loginForm.hasError('credentials')" class="feilmelding blokk-m">
                    Feil brukernavn eller passord... Prøv igjen!
                </p>
                <div class="text-center container-inline">
                    <button class="knapp-submit" type="submit" [disabled]="!loginForm.valid || isLoggingIn">Logg inn</button>
                    <a routerLink="/intro">Avbryt</a>
                </div>
            </form>
        </div>
    `
})
export class Login {
    isLoggingIn: boolean;
    loginForm: FormGroup;

    constructor(private router:Router, private backend: Backend, fb: FormBuilder) {
        this.isLoggingIn = false;

        this.loginForm = fb.group({
            email: '',
            password: ''
        });
    }

    login() {
        if(this.loginForm.valid) {
            const email = this.loginForm.controls['email'].value;
            const password = this.loginForm.controls['password'].value;

            const onSucces = () => {
                ga('send', 'event', 'login', 'success');
                this.router.navigate(['profile']);
            };
            const onError = () => {
                ga('send', 'event', 'login', 'failure');
                this.loginForm.setErrors({
                    credentials: true
                });
                this.isLoggingIn = false;
                this.loginForm.markAsPristine();
            };

            this.backend.login(email, password).subscribe(onSucces, onError);
        }
    }
}