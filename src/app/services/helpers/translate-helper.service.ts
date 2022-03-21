import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationHelperService} from './authentication-helper.service';
import {AvailableLanguages, DefaultLang} from '../../constants/general-variables';
// import {HttpUserService} from "../http-requests/http-user.service";

@Injectable({
    providedIn: 'root'
})
export class TranslateHelperService {

    availableLangs: string[] = [];
    defaultLang: string = DefaultLang.name;
    availableLangsAndValues: any[] = AvailableLanguages;
    availableLangsValues: any[] = [];
    langFromStorage = JSON.parse(localStorage.getItem('user_lang') as string);

    constructor(public translate: TranslateService,
                private userAuthHelper: AuthenticationHelperService) {
        AvailableLanguages.forEach((lang: { value: any; name: any; }) => {
            this.availableLangsValues.push(lang.value);
            this.availableLangs.push(lang.name);
        });
    }

    initTraslate(): void {
        this.translate.addLangs(this.availableLangs);
        this.translate.setDefaultLang(this.defaultLang);
        if (this.langFromStorage) {
            this.translate.use(this.langFromStorage);
        } else if (this.userAuthHelper.getUserData && this.availableLangs.includes(this.userAuthHelper.getUserData.language)) {
            this.translate.use(this.userAuthHelper.getUserData.language);
            this.changeLang(this.userAuthHelper.getUserData.language);
        } else {
            localStorage.setItem('user_lang', JSON.stringify(this.defaultLang));
            this.translate.use(this.defaultLang);
        }
    }

    setLang(lang: string): void {
        this.translate.use(lang);
        localStorage.setItem('user_lang', JSON.stringify(lang));
        this.langFromStorage = lang;
    }

    getLang(): any {
        return this.translate.currentLang;
    }

    getFullLangName(langSlug: string): string {
        switch (langSlug.toLowerCase()) {
            case 'en':
                return 'English';
            case 'de':
                return 'German';
            case 'fr':
                return 'French';
            case 'es':
                return 'Spanish';
            case 'it':
                return 'Italian';
            default:
                return 'English';
        }
    }

    getShortenedLangName(lang: string): string {
        switch (lang.toLowerCase()) {
            case 'english':
                return 'en';
            case 'german':
                return 'de';
            case 'french':
                return 'fr';
            case 'spanish':
                return 'es';
            case 'italian':
                return 'it';
            default:
                return 'en';
        }
    }

    getAllLangs(): any {
        return this.translate.getLangs();
    }

    changeLang(lang: any): void {
        this.availableLangsAndValues.forEach((langObj: any) => {
            if (langObj.value === lang) {
                this.setLang(langObj.name);
                this.changeLangHttp(lang);
            }
        });
    }

    changeLangHttp(lang: string): void {
        // API call for changing lang
        // this.httpUserService.changeLang(this.userAuthHelper.getUserData.id, {lang: this.getShortenedLangName(lang)}).subscribe((response: any) => {
        // });
    }
}
