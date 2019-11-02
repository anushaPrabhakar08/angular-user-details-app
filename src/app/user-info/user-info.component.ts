import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Iproduct } from '../iproduct';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

const ELEMENT_DATA: Iproduct[] = [];

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  mobileQuery: MediaQueryList;
  
  userData = JSON.parse(localStorage.getItem('currentUser'));
  //console.log(userData);

  private _mobileQueryListener: () => void;

  constructor(private newService: CommonService,
              private router: Router) {

  }


  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {

  }

}
