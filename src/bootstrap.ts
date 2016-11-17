import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {App} from "./components/app";
import {Introduction} from "./components/introduction";
import {Profile} from "./components/profile";
import {Login} from "./components/login";
import {RegistrationForm} from "./components/registration-form";
import {ListRegistered} from "./components/list-registered";
import {Admin} from "./components/admin";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

@NgModule({
    bootstrap: [ App ],
    imports: [
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule.forRoot([
            { path: 'intro', component: Introduction },
            { path: 'profile', component: Profile },
            { path: 'login', component: Login },
            { path: 'register', component: RegistrationForm },
            { path: 'registrerte', component: ListRegistered },
            { path: 'admin', component: Admin },
            { path: '', redirectTo: '/intro', pathMatch: 'full' }
        ])
    ],
    declarations: [
        App,
        Introduction,
        Profile,
        Login,
        RegistrationForm,
        ListRegistered,
        Admin
    ]
})
export class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
