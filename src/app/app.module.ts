import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuardService} from './guards/auth-guard.service';
import {OuterPagesGuardService} from './guards/outer-pages-guard.service';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {BaseUrl} from './interceptors/base-url.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/translate/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        UserProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        AuthGuardService,
        OuterPagesGuardService,
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: BaseUrl, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
