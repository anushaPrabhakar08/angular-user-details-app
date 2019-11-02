import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Iproduct } from '../iproduct';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  localstorage = localStorage;
  currentUser;
  constructor(private userService: CommonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // if (this.userService.checkLogin()) {
    //   this.router.navigate(['/userdashboard'], { relativeTo: this.route });
    // }
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.userService.getUser(this.loginForm.value).subscribe((data) => {
      console.log(data);
      if (data.length > 0) {
        this.currentUser = JSON.stringify(data);
        this.localstorage.setItem('currentUser', this.currentUser);
        this.loginForm.reset();
        this.router.navigate(['/userdashboard'], { relativeTo: this.route });
      }
    });
  }
}



@Component({
  selector: 'app-logout',
  template: '<p>redirecting...</p>',
})
export class LogoutComponent implements OnInit {
  constructor(private userService: CommonService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    if (this.userService.logout()) {
      this.router.navigate(['/userlogin'], { relativeTo: this.route });
    }
  }
}