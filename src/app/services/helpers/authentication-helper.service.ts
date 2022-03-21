import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
// import {OneSignal} from '@ionic-native/onesignal/ngx';
// import {TranslateHelperService} from './translate-helper.service';
import {LocalStorageProperties} from '../../enums/general-enums';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationHelperService {

    private isUserAuthenticated = false;
    private userData: any = null;
    private token = '';

    constructor(private router: Router) {
        this.checkIfUserIsLogged();
    }

    get isAuthenticated(): boolean {
        return this.isUserAuthenticated;
    }

    get getToken(): string {
        return this.token;
    }

    get getUserData(): any {
        return this.userData;
    }

    clientLogout(redirectionUrl: string): void {
        // this.oneSignal.setSubscription(false);
        this.deleteClientInfoFromStorage();
        this.router.navigate([redirectionUrl]);
    }

    setUserData(newData: any): void {
        this.userData = newData;
        localStorage.setItem(LocalStorageProperties.user, JSON.stringify(this.userData));
    }

    clientLogin(user: any, token: string, redirectionUrl: string): void {
        this.setUserData(user);
        this.setToken(token);
        this.isUserAuthenticated = true;
        // this.oneSignal.setSubscription(true);
        if (redirectionUrl) {
            setTimeout(() => {
                this.router.navigate([redirectionUrl]);
            });
        }
    }

    private setToken(newData: any): void {
        this.token = newData;
        localStorage.setItem(LocalStorageProperties.token, JSON.stringify(this.token));
    }

    private deleteClientInfoFromStorage(): void {
        localStorage.removeItem(LocalStorageProperties.user);
        localStorage.removeItem(LocalStorageProperties.token);
        this.isUserAuthenticated = false;
    }

    // If user token is still active, set user data
    private checkIfUserIsLogged(): void {
        let user: any;
        let token: any;
        if (localStorage.getItem(LocalStorageProperties.user) !== 'undefined') {
            user = JSON.parse(JSON.stringify(localStorage.getItem(LocalStorageProperties.user)));
        }
        if (localStorage.getItem(LocalStorageProperties.token) !== 'undefined') {
            token = JSON.parse(JSON.stringify(localStorage.getItem(LocalStorageProperties.token)));
        }
        if (user && !this.isUserAuthenticated) {
            this.clientLogin(user, token, '');
        }
    }
}
