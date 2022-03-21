import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginRoutingModule} from './pages/login/login-routing.module';
import {UserProfileRoutingModule} from './pages/user-profile/user-profile-routing.module';
import {PAGES_AND_PATHS} from './constants/pages-and-paths';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: PAGES_AND_PATHS.login.pagePath
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), LoginRoutingModule, UserProfileRoutingModule],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
