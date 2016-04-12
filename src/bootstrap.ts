import {HashLocationStrategy, LocationStrategy, ROUTER_PROVIDERS} from "angular2/router";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {bootstrap} from "angular2/bootstrap";
import {App} from "./components/app";

bootstrap(App, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);