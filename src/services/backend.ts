import { Http, Response, Headers } from 'angular2/http';
import { Observable } from 'angular2/angular2';

export class Backend {
    constructor(private http: Http) {
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
    
    public getNissebarn(): Observable<Response> {
        return this.getAuthResource('/api/nissebarn');
    }

    public getOnsker(): Observable<Response> {
        return this.getAuthResource('/api/onsker');
    }

    public updateOnsker(onsker: string): Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-AUTH-TOKEN', localStorage.getItem('auth-token'));
        var body = JSON.stringify({onsker: onsker});

        return new Observable<Response>(observer => {
            this.http.post('/api/onsker', body, { headers: headers }).subscribe(response => {
                if (response.status === 403) {
                    localStorage.removeItem('auth-token');
                }
                observer.next(response);
            });
        });
    }
    
    public isLoggedIn(): boolean {
        return localStorage.getItem('auth-token') != null;
    }
    
    public logout() {
        localStorage.removeItem('auth-token');
    }
    
    public login(email:String, password:String): Observable<Response> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        var body = JSON.stringify({
            email: email,
            password: password
        });

        return new Observable<Response>(observer => {
            this.http.post('/api/login', body, { headers: headers }).subscribe(response => {
                if (response.status === 200) {
                    localStorage.setItem('auth-token', response.json()['auth-token']);
                }
                observer.next(response);
            });
        });
    }

    private getAuthResource(resourceUrl: string): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('X-AUTH-TOKEN', localStorage.getItem('auth-token'));

        return new Observable<Response>(observer => {
            this.http.get(resourceUrl, { headers: headers }).subscribe(response => {
                if (response.status === 403) {
                    this.logout();
                }
                observer.next(response);
            });
        });
    }
}
