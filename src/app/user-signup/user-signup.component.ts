import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Iproduct } from '../iproduct';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  userform: FormGroup;
  hide = true;

  constructor(private newService: CommonService,
              private router: Router) { }

  public hasError = (controlName: string, errorName: string) => {
    return this.userform.controls[controlName].hasError(errorName);
  }

  valbutton = "Save";
  localstorage = localStorage;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
    this.userform = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }


  // getDate(data,ref) {
  //   console.log(data.value);
  //   console.log(typeof ref.value);
  // }
  // coonvertDate(d) {
  //   const date = new Date(d);
  //   console.log(date);
  //   return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  // }

  onSignin(user, invalid: Boolean) {
    user.mode = this.valbutton;
    const data = { email: user.email, password: user.password };
    this.newService.saveUser(user)
      .subscribe(response => {
        //this.localstorage.setItem('currentUser', JSON.stringify(response));
        const link = '/userlogin';
        this.router.navigate([link]);
      });

      // this.newService.saveUser(user)
      // .subscribe(response => {
      //   this.router.navigate(['/login'], { relativeTo: this.route });
      // });
  }

}
