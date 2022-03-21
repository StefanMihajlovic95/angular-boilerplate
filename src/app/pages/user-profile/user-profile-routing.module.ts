import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PAGES_AND_PATHS} from "../../constants/pages-and-paths";
import {LoginComponent} from "../login/login.component";
import {AuthGuardService} from "../../guards/auth-guard.service";
import {UserProfileComponent} from "./user-profile.component";

const routes: Routes = [
  {
    path: PAGES_AND_PATHS.userProfile.pageInRouting,
    data: {data: PAGES_AND_PATHS.userProfile},
    component: UserProfileComponent,
    canActivate: [AuthGuardService],
    loadChildren: () => import('./user-profile.module').then(m => m.UserProfileModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
