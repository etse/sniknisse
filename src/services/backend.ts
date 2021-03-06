import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subscriber} from "rxjs/Subscriber";

@Injectable()
export class Backend {
    constructor(private http:Http) {
    }

    public getAllUsers():Observable<Response> {
        var headers = new Headers();
        headers.append('X-AUTH-TOKEN', localStorage.getItem('auth-token'));
        return this.http.get('/api/users', {headers: headers});
    }

    public createNewUser(name:String, email:String, lokasjon:String, password:String, onsker:String):Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var body = JSON.stringify({
            name: name,
            email: email,
            lokasjon: lokasjon,
            password: password,
            onsker: onsker
        });

        return this.http.post('/api/users', body, {headers: headers});
    }

    public getNissebarn():Observable<Response> {
        return this.getAuthResource('/api/nissebarn');
    }

    public getOnsker():Observable<Response> {
        return this.getAuthResource('/api/onsker');
    }

    public settLevert(userid:number, status:boolean):Observable<Response> {
        var body = JSON.stringify({levert: status});
        return this.postAuthResource('/api/users/' + userid, body);
    }

    public delUtNissebarn():Observable<Response> {
        var headers = new Headers();
        headers.append('X-AUTH-TOKEN', localStorage.getItem('auth-token'));
        return this.http.post('/api/nissebarn', null, {headers: headers});
    }

    public updateOnsker(onsker:string):Observable<Response> {
        var body = JSON.stringify({onsker: onsker});
        return this.postAuthResource('/api/onsker', body);
    }

    public isLoggedIn():boolean {
        return localStorage.getItem('auth-token') != null;
    }

    public logout() {
        localStorage.removeItem('auth-token');
    }

    public login(email:String, password:String):Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var body = JSON.stringify({
            email: email,
            password: password
        });

        return this.http.post('/api/login', body, {headers: headers})
            .map(res => res.json())
            .do(result => localStorage.setItem('auth-token', result['auth-token']));
    }

    private postAuthResource(resourceUrl: string, body: string):Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-AUTH-TOKEN', localStorage.getItem('auth-token'));

        return new Observable<Response>((observer:Subscriber<Response>) => {
            this.http.post(resourceUrl, body, {headers: headers}).subscribe(response => {
                if (response.status === 403) {
                    localStorage.removeItem('auth-token');
                }
                observer.next(response);
            });
        });
    }

    private getAuthResource(resourceUrl:string):Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-AUTH-TOKEN', localStorage.getItem('auth-token'));

        return new Observable<Response>((observer:Subscriber<Response>) => {
            this.http.get(resourceUrl, {headers: headers}).subscribe(response => {
                if (response.status === 403) {
                    this.logout();
                }
                observer.next(response);
            });
        });
    }
}
