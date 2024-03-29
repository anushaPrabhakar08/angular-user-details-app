import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  message: string = ""
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogComponent>) {
    // if (data) {
    //   this.message = data.message || this.message;
    //   if (data.buttonText) {
    //     this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    //   }
    // }
    // this.dialogRef.updateSize('300vw', '300vw')
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){

  }

}
