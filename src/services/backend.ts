import { Http, Response } from 'angular2/http';
import { Observable } from 'angular2/angular2';

export class Backend {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public register(name: String, email: String, password: String): Observable<Response> {
        return null;
    }

    public getAllUsers(): Observable<Response> {
        return this.http.get('/api/users');
    }
}
