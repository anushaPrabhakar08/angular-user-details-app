import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserLoginComponent, LogoutComponent } from './user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserAddMemberComponent } from './user-add-member/user-add-member.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserDashboardComponent,
    UserAddMemberComponent,
    UserInfoComponent,
    AlertDialogComponent,
    NavBarComponent,
    UserDetailsComponent,
    UserSignupComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  entryComponents:[AlertDialogComponent,UserDashboardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
