import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-user-add-member',
  templateUrl: './user-add-member.component.html',
  styleUrls: ['./user-add-member.component.css']
})
export class UserAddMemberComponent implements OnInit {
  addMemberform: FormGroup;
  arr: FormArray;

  constructor(private _snackBar: MatSnackBar, private newService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.userCode = this.route.snapshot.paramMap.get('id');
    this.userEmail = this.route.snapshot.paramMap.get('userid');
  }


  selectRung = new FormControl(null, [Validators.required]);
  valbutton = "Save";
  userCode;
  userEmail;
  userid = new FormControl('');

  public hasError = (controlName: string, errorName: string) => {
    return this.addMemberform.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
    this.addMemberform = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })
  }
  createItem() {
    return this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobno: new FormControl(),
      gender: new FormControl()
    });
  }

  addItem() {
    this.arr = this.addMemberform.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }

  emailFormControl = new FormControl('', [
    Validators.email
  ]);

  onMemberSave(member, invalid: Boolean) {
    // console.log(this.addMemberform.value);
    // console.log(member)

    for (let i = 0; i < member.length; i++) {
      member[i].mode = this.valbutton;
      member[i].userid = this.newService.getCurrentUser()._id;
      console.log(member[i]);
      this.newService.saveMember(member[i])
        .subscribe(response => {
          console.log(response);
           const link = '/userdashboard/family-members';
           this.router.navigate([link]);
        })
    }
    this._snackBar.open('Record has been Saved..!!!', ' ', { duration: 3000, });
  }


}
