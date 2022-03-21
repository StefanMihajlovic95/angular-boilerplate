import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PAGES_AND_PATHS, DEFAULT_AUTHENTICATED_PAGE} from '../constants/pages-and-paths';
import {AuthenticationHelperService} from '../services/helpers/authentication-helper.service';


@Injectable()
export class OuterPagesGuardService implements CanActivate {

    constructor(public authenticationService: AuthenticationHelperService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if (route.data.data) {
            if (this.authenticationService.isAuthenticated &&
                !route.data.data.needAuthentication) {
                this.router.navigate([DEFAULT_AUTHENTICATED_PAGE.page.pagePath]);
                return false;
            }
        }
        return true;
    }

}
