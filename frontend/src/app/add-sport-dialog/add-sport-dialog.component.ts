import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../place-main/place-main.component';

@Component({
  selector: 'app-add-sport-dialog',
  templateUrl: './add-sport-dialog.component.html',
  styleUrls: ['./add-sport-dialog.component.css']
})
export class AddSportDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
