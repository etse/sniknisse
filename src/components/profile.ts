import { Backend } from "../services/backend";
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'nisse-profile',
    providers: [Backend],
    template: `
        <img class="image-right hidden-mobile" src="./images/christmas-tree.png" />
        <div class="container-inline">
            <div class="text-center blokk-s" *ngIf="showSpinner">
                <img class="text-center" src='./images/spinner.gif' />
            </div>

            <div class="blokk-l">
                <p *ngIf="!harNissebarn()">
                    Du har ikke blitt tildelt et nissebarn. Dette er trolig fordi du registrerte
                    deg etter fristen. Ta kontakt med Steffen, så vil han prøve å få ordnet så
                    også du kan bli med.
                </p>
                <div *ngIf="harNissebarn()">
                    <p>Du har blitt tildelt <em>{{nissebarn.name}}</em> som ditt nissebarn.</p>
                    <p>Tips:
                        <em *ngIf="harNissebarnMedOnsker()">{{nissebarn.onsker}}</em>
                        <em *ngIf="!harNissebarnMedOnsker()">Ditt nissebarn har ikke skrevet inn noen ønsker enda :(</em>
                    </p>
                </div>
            </div>
            <div>
                <form (submit)="endreOnske($event)" [formGroup]="endreForm" novaldiate >
                    <div class="blokk-m">
                        <label for="onsker">Din ønskeliste:</label>
                        <textarea id="onsker" formControlName="onsker" [value]="onsker" placeholder="Her kan du komme med tips..."></textarea>
                    </div>
                    <div class="text-center container-inline">
                        <button class="knapp-submit" type="submit" [disabled]="!endreForm.valid">Lagre</button>
                    </div>
                </form>
            </div>
        </div>
    `
})
export class Profile {
    showSpinner: boolean;
    endreForm: FormGroup;
    nissebarn: any;
    onsker: string;

    constructor(private router: Router, private backend: Backend) {
        this.showSpinner = true;

        if (!this.backend.isLoggedIn()) {
            router.navigate(['/Login']);
        }

        this.endreForm = new FormGroup({
            onsker: new FormControl('')
        });

        this.backend.getNissebarn().subscribe(response => {
            this.showSpinner = false;
            if(response.status === 403) {
                router.navigate(['/Login']);
            } else if (response.status === 200) {
                this.nissebarn = response.json();
            }
        });

        this.backend.getOnsker().subscribe(response => {
            if(response.status === 403) {
                router.navigate(['/Login']);
            } else if(response.status === 200) {
                this.onsker = response.json()['onsker'];
                this.endreForm['onsker'].updateValueAndValidity();
            }
        });
    }

    harNissebarn(): boolean {
        return this.nissebarn != null;
    }

    harNissebarnMedOnsker(): boolean {
        return this.nissebarn != null && this.nissebarn.onsker != "";
    }

    endreOnske() {
        let onsker = this.endreForm['onsker'].value;
        if(onsker != "") {
            this.backend.updateOnsker(onsker).subscribe(response => {
                if (response.status === 403) {
                    this.router.navigate(['/Login']);
                }
            });
        }
    }
}