import { Component, View, Inject } from 'angular2/angular2';
import { Router } from 'angular2/router';
import { Http } from 'angular2/http';
import { Backend } from "../services/backend";

@Component({
    selector: 'nisse-profile'
})
@View({
    template: `<p>Her skal du se profilen din</p>`
})
export class Profile {
    backend: Backend;

    constructor(@Inject(Http) http: Http, private router: Router) {
        this.backend = new Backend(http);
        if (!this.backend.isLoggedIn()) {
            router.navigate(['/Login']);
        }
    }
}