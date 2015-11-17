import { Http, Response, Headers } from 'angular2/http';
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
    
    public createNewUser(name:String, email:String, password:String, onsker:String): Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        var body = JSON.stringify({
            name: name,
            email: email,
            password: password,
            onsker: onsker
        });
        
        return this.http.post('/api/users', body, {headers: headers});
    }
}
