import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class BaseUrl implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        const url = environment.API_ENDPOINT;
        const langReq = req.clone({url: ''});
        const apiRequest = req.clone({url: url + req.url});
        if (req.url.includes('assets/translate')) {
            return next.handle(langReq);
        } else {
            return next.handle(apiRequest);
        }
    }
}
