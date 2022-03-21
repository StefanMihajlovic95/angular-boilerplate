import {Component} from '@angular/core';
import {TranslateHelperService} from './services/helpers/translate-helper.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'Boilerplate';

    constructor(private translateHelper: TranslateHelperService) {
        this.translateHelper.initTraslate();
    }
}
