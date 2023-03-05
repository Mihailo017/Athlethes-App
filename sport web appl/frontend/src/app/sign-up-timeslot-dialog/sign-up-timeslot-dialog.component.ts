import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../play-now/play-now.component';

@Component({
  selector: 'app-sign-up-timeslot-dialog',
  templateUrl: './sign-up-timeslot-dialog.component.html',
  styleUrls: ['./sign-up-timeslot-dialog.component.css']
})
export class SignUpTimeslotDialogComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<SignUpTimeslotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.timeslotFull = false;
  }

  timeslotFull: boolean;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    let cnt = 0;
    for (let i = 0; i < this.data.timeslot.t1.length; i++) {
      if (this.data.timeslot.t1[i].player != "" || this.data.timeslot.t2[i].player != "") cnt++;
    }
    this.timeslotFull = (cnt == (this.data.timeslot.t1.length + this.data.timeslot.t2.length));
  }

}
