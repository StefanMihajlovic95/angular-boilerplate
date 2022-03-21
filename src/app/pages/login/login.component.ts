import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationHelperService} from 'src/app/services/helpers/authentication-helper.service';
import {PAGES_AND_PATHS} from '../../constants/pages-and-paths';
import {TranslateService} from '@ngx-translate/core';
import {TranslateHelperService} from '../../services/helpers/translate-helper.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    userCredentials = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        lang: new FormControl('', null)
    });
    errMessage = '';

    constructor(private authenticationHelperService: AuthenticationHelperService,
                public translateService: TranslateService,
                public translateHelperService: TranslateHelperService) {
        this.userCredentials.controls.lang.setValue(this.translateHelperService.getFullLangName(this.translateHelperService.getLang()));
    }

    ngOnInit(): void {
    }

    changeLang(event: any): void {
        this.translateHelperService.changeLang((event.target.value));
    }

    login(): void {
        this.authenticationHelperService.clientLogin({username: this.userCredentials.value.email}, 'sometesttoken123', PAGES_AND_PATHS.userProfile.pagePath);
    }

}
