///<reference path="../../node_modules/angular2/src/common/forms/directives.d.ts"/>
import { Http } from 'angular2/http';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { Backend } from '../services/backend';
import {FORM_DIRECTIVES, ControlGroup, Validators, Control} from "angular2/common";
import {Component} from "angular2/core";

@Component({
    selector: 'nisse-registration-form',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    template: `
        <div class="container">
            <img class="image-right hidden-mobile" src="./images/santa.png" />
            <form (submit)="register($event)" [ngFormModel]="registerForm" novaldiate >
                <div class="blokk-s">
                    <label for="name">Ditt navn:</label>
                    <input id="name" ngControl="name" type="text" placeholder="Ditt navn" />
                </div>
                <div class="blokk-s">
                    <label for="email">Din epost:</label>
                    <input id="email" ngControl="email" type="text" placeholder="navn@bekk.no" />
                </div>            
                <div class="blokk-s">
                    <label for="password1">Velg et passord:</label>
                    <input id="password1" ngControl="password1" type="password" placeholder="Passord" />
                </div>
                <div class="blokk-s">
                    <label for="password2">Gjenta passordet:</label>
                    <input id="password2" ngControl="password2" type="password" placeholder="Gjenta passord" />
                </div>
                <div class="blokk-m">
                    <label for="onsker">Tips til sniknissen:</label>
                    <textarea id="onsker" ngControl="onsker" placeholder="Her kan du komme med tips..."></textarea>
                </div>
                <div class="text-center container-inline">
                    <button class="knapp-submit" type="submit" [disabled]="!registerForm.valid">Registrer deg</button>
                    <p><a [routerLink]="['/Intro']">Avbryt</a></p>
                </div>
            </form>
        </div>
    `
})
export class RegistrationForm {
    backend: Backend;
    registerForm: ControlGroup;
    
    constructor(http: Http, private router: Router) {
        this.backend = new Backend(http);
        
        this.registerForm = new ControlGroup({
            name: new Control('', Validators.required),
            email: new Control('', Validators.required),
            password1: new Control('', Validators.required),
            password2: new Control('', Validators.required),
            onsker: new Control('')
        });
        
        this.registerForm.controls['password1'].valueChanges.subscribe((value) => this.checkPasswordsEqual());
        this.registerForm.controls['password2'].valueChanges.subscribe((value) => this.checkPasswordsEqual());
    }
    
    public register() {
        if(this.registerForm.valid) {
            let name = this.registerForm.controls['name'].value;
            let email = this.registerForm.controls['email'].value;
            let password = this.registerForm.controls['password1'].value;
            let onsker = this.registerForm.controls['onsker'].value;
            
            this.backend.createNewUser(name, email, password, onsker).subscribe(response => {
                this.router.navigate(['/ListRegistered']);
            })
        }
    }
    
    private checkPasswordsEqual() {
        const pass1 = this.registerForm.controls['password1'];
        const pass2 = this.registerForm.controls['password2'];
        
        if(pass1.value !== pass2.value) {
            pass2.setErrors({'notEual': false});
        }
    }
}
