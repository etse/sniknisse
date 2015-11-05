import {Http} from 'angular2/http';
import {EventEmitter} from 'angular2/angular2';

export class Backend {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    public getTest(): any {
        return this.http.get('/api/test');
    }

    public customObservable(): any {
        let count = 0;
        let emitter = new EventEmitter();

        let cancel = setInterval(() => {
            emitter.next(count++);
            if(count > 30) {
                emitter.return(-1);
                clearInterval(cancel);
            }
        }, 100);

        return emitter;
    }
}