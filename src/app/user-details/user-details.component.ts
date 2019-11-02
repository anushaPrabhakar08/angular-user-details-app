import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Iproduct } from '../iproduct';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

const ELEMENT_DATA: Iproduct[] = [];

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  userid;
  constructor(private _snackBar: MatSnackBar,private newService: CommonService,
    private router: Router,
    private dialog: MatDialog,) {
    this.userid = this.newService.getCurrentUser()._id;
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'action'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.getDataSource();
  }

  getDataSource() {
    this.newService.getMemberByUserId(this.userid).subscribe((data: Iproduct[]) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }


  openAlertDialog(element: Iproduct, isEdit: boolean, index?: number) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '250px',
      data: { name: element, isEdit: isEdit, index: index }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (isEdit) {
        //debugger
        result.mode = "Update";
        this.newService.saveMember(result.name)
          .subscribe(data => {
            this._snackBar.open('Record Has been Edited..!!!',' ', {duration: 2000,});
            this.getDataSource();
          })
      }
      else {
        // debugger;
        this.newService.deleteMember(result.name._id)
          .subscribe(data => {
            this._snackBar.open('Record Has been Deleted..!!!',' ', {duration: 2000,});
            this.getDataSource();
          },
            error => error)
      }
    });
  }

}
