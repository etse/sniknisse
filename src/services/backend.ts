import {Http} from 'angular2/http';
import {Observable} from 'angular2/core';

export class Backend {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public getTest(): any {
        return this.http.get('/api/test');
    }
}