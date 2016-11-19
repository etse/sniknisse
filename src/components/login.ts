import { Router } from '@angular/router';
import {Component} from "@angular/core";
import { Backend } from "../services/backend";
import {FormGroup, FormBuilder} from "@angular/forms";

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
                <div class="text-center container-inline">
                    <button class="knapp-submit" type="submit" [disabled]="!loginForm.valid || isLoggingIn">Logg inn</button>
                    <a routerLink="/intro">Avbryt</a>
                </div>
            </form>
        </div>
    `
})
export class Login {
    hasError: boolean;
    isLoggingIn: boolean;
    loginForm: FormGroup;

    constructor(private router:Router, private backend: Backend, fb: FormBuilder) {
        this.hasError = false;
        this.isLoggingIn = false;

        this.loginForm = fb.group({
            email: '',
            password: ''
        })
    }

    login() {
        if(this.loginForm.valid) {
            let email = this.loginForm.controls['email'].value;
            let password = this.loginForm.controls['password'].value;
            this.backend.login(email, password).subscribe(response => {
                if (response.status === 200) {
                    this.router.navigate(['profile']);
                } else {
                    this.hasError = true;
                    this.isLoggingIn = false;
                }
            });
        }
    }
}