import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PAGES_AND_PATHS} from '../constants/pages-and-paths';
import {AuthenticationHelperService} from '../services/helpers/authentication-helper.service';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public authenticationService: AuthenticationHelperService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if (!this.authenticationService.isAuthenticated) {
            this.router.navigate([PAGES_AND_PATHS.login.pagePath]);
        }
        return this.authenticationService.isAuthenticated;
        // return true;
    }

}
