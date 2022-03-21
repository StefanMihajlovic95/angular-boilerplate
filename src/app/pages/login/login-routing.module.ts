import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PAGES_AND_PATHS} from '../../constants/pages-and-paths';
import {OuterPagesGuardService} from '../../guards/outer-pages-guard.service';
import {LoginComponent} from './login.component';

const routes: Routes = [
    {
        path: PAGES_AND_PATHS.login.pageInRouting,
        data: {data: PAGES_AND_PATHS.login},
        component: LoginComponent,
        canActivate: [OuterPagesGuardService],
        loadChildren: () => import('./login.module').then(m => m.LoginModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
