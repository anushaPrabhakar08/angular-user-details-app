import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserAddMemberComponent } from './user-add-member/user-add-member.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserLoginComponent, LogoutComponent } from './user-login/user-login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserSignupComponent } from './user-signup/user-signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/userlogin', pathMatch: 'full' },
  // { path: 'userdashboard/:id/:userid', component: UserDashboardComponent },
  {
    path: 'userdashboard', component: UserDashboardComponent,
    children: [
      { path: '', component: UserDetailsComponent },
      { path: 'family-members', component: UserDetailsComponent },
      { path: 'useraddmember', component: UserAddMemberComponent },
      { path: 'userinfo', component: UserInfoComponent },
    ]
  },

  // { path: 'userinfo', component: UserInfoComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'userlogin', component: UserLoginComponent },
  { path: 'usersignup', component: UserSignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
