import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../play-now/play-now.component';

@Component({
  selector: 'app-team-sign-up-dialog',
  templateUrl: './team-sign-up-dialog.component.html',
  styleUrls: ['./team-sign-up-dialog.component.css']
})
export class TeamSignUpDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TeamSignUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.numPlayers = 0;
  }

  numPlayers: number;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.numPlayers = 2 * this.data.timeslot.t1.length;
  }


}
