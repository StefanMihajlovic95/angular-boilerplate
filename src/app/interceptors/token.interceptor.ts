import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthenticationHelperService} from '../services/helpers/authentication-helper.service';
import {PAGES_AND_PATHS} from '../constants/pages-and-paths';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private authService: AuthenticationHelperService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.getToken;
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token,
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }

        if (!request.headers.has('Content-Type')) {
            // request = request.clone({
            //     // setHeaders: {
            //     //     'Content-Type': 'multipart/form-data'
            //     // }
            // });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.clientLogout(PAGES_AND_PATHS.login.pagePath);
                }
                return throwError(error);
            }));
    }

}
