import { Router } from '@angular/router';
import { Backend } from '../services/backend';
import {Component} from "@angular/core";
import {FormControl, Validators, FormGroup} from "@angular/forms";

@Component({
    selector: 'nisse-registration-form',
    providers: [Backend],
    template: `
        <div class="container">
            <img class="image-right hidden-mobile" src="./images/santa.png" />
            <form (submit)="register($event)" [formGroup]="registerForm" novaldiate >
                <div class="blokk-s">
                    <label for="name">Ditt navn:</label>
                    <input id="name" formControlName="name" type="text" placeholder="Ditt navn" />
                </div>
                <div class="blokk-s">
                    <label for="email">Din epost:</label>
                    <input id="email" formControlName="email" type="text" placeholder="navn@bekk.no" />
                </div>            
                <div class="blokk-s">
                    <label for="password1">Velg et passord:</label>
                    <input id="password1" formControlName="password1" type="password" placeholder="Passord" />
                </div>
                <div class="blokk-s">
                    <label for="password2">Gjenta passordet:</label>
                    <input id="password2" formControlName="password2" type="password" placeholder="Gjenta passord" />
                </div>
                <div class="blokk-m">
                    <label for="onsker">Tips til sniknissen:</label>
                    <textarea id="onsker" formControlName="onsker" placeholder="Her kan du komme med tips..."></textarea>
                </div>
                <div class="text-center container-inline">
                    <button class="knapp-submit" type="submit" [disabled]="!registerForm.valid">Registrer deg</button>
                    <p><a routerLink="/intro">Avbryt</a></p>
                </div>
            </form>
        </div>
    `
})
export class RegistrationForm {
    registerForm: FormGroup;
    
    constructor(private router: Router, private backend: Backend) {

        this.registerForm = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            password1: new FormControl('', Validators.required),
            password2: new FormControl('', Validators.required),
            onsker: new FormControl('')
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
