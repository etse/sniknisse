import { Router } from 'angular2/router';
import { Http } from 'angular2/http';
import { Backend } from "../services/backend";
import {Component, Inject} from "angular2/core";
import {ControlGroup, Control} from "angular2/common";

@Component({
    selector: 'nisse-profile',
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
                <form (submit)="endreOnske($event)" [ngFormModel]="endreForm" novaldiate >
                    <div class="blokk-m">
                        <label for="onsker">Din ønskeliste:</label>
                        <textarea id="onsker" ngControl="onsker" [value]="onsker" placeholder="Her kan du komme med tips..."></textarea>
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
    backend: Backend;
    showSpinner: boolean;
    endreForm: ControlGroup;
    nissebarn: any;
    onsker: string;

    constructor(@Inject(Http) http: Http, private router: Router) {
        this.backend = new Backend(http);
        this.showSpinner = true;

        if (!this.backend.isLoggedIn()) {
            router.navigate(['/Login']);
        }

        this.endreForm = new ControlGroup({
            onsker: new Control('')
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
                this.endreForm.controls['onsker'].updateValueAndValidity();           
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
        let onsker = this.endreForm.controls['onsker'].value;
        if(onsker != "") {
            this.backend.updateOnsker(onsker).subscribe(response => {
                if (response.status === 403) {
                    this.router.navigate(['/Login']);
                }
            });
        }
    }
}