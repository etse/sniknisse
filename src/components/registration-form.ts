import { Component, View, Inject } from 'angular2/angular2';
import { Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { Backend } from '../services/backend';

@Component({
    selector: 'nisse-registration-form'
})
@View({
    directives: [FORM_DIRECTIVES],
    template: `
        <h2>Registrer deg</h2>
        <form (submit)="register($event)" [ng-form-model]="registerForm" novalidate>
            <input ng-control="name" type="text" placeholder="Ditt navn" />
            <input ng-control="email" type="email" placeholder="Din epost" />
            <button type="submit">Registrer deg</button>
        </form>
    `
})
export class RegistrationForm {
    backend: Backend;
    registerForm: ControlGroup;
    
    constructor(@Inject(Http) http) {
        this.backend = new Backend(http);
        
        this.registerForm = new ControlGroup({
            name: new Control('', Validators.required),
            email: new Control('', Validators.required)
        });
    }
    
    public register(event: Event) {
        console.log(event);
        console.log(this.registerForm.valid);
        console.log(this.registerForm.value);
    }
}
