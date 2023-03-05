import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddSportDialogComponent } from '../add-sport-dialog/add-sport-dialog.component';
import { Place } from '../models/place';
import { Sport } from '../models/sport';
import { SportInfo } from '../models/sportInfo';
import { PlaceService } from '../place.service';

export class TournamentData {
  'sport': string;
  'date': string;
  'status': string;
  'unos': boolean;
}

export interface DialogData {
  allSports: Sport[];
  newSportInfo: SportInfo;
}

@Component({
  selector: 'app-place-main',
  templateUrl: './place-main.component.html',
  styleUrls: ['./place-main.component.css']
})
export class PlaceMainComponent implements OnInit {

  linkNames = ['Moj profil', 'Napravi turnir'];
  links = ['placeMain', 'placeTournaments']
  activeLink = this.links[0];

  constructor(private dialog: MatDialog, private placeService: PlaceService, private router: Router) {
    this.loggedIn = new Place();
    this.firstLogin = false;
    this.allSports = [];
    this.addedSports = [];
    this.newSportInfo = new SportInfo();
    this.sportAdded = false;
    this.myTournaments = [];
  }

  myTournaments: TournamentData[];
  loggedIn: Place;
  firstLogin: boolean;
  allSports: Sport[];
  addedSports: SportInfo[];
  newSportInfo: SportInfo;
  sportAdded: boolean;


  ngOnInit(): void {

    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Place();
    }

    s = localStorage.getItem('firstLogin');
    if (s) {
      this.firstLogin = JSON.parse(s) == 'true' ? true : false;
    }
    else {
      // should not happen
    }

    this.getAllSports();
    this.getMyTournaments();
  }

  getAllSports() {
    this.placeService.getAllSports().subscribe((sports: Object) => {
      this.allSports = sports as Sport[];
    })
  }

  openAddSportDialog(): void {
    const dialogRef = this.dialog.open(AddSportDialogComponent, {
      width: '250px',
      data: { allSports: this.allSports, newSportInfo: this.newSportInfo },
    });

    dialogRef.afterClosed().subscribe((result: Object) => {
      console.log('The dialog was closed');
      let si = result as SportInfo;
      this.addedSports.push(si);
      this.loggedIn.placeSports.push(si);
      this.sportAdded = true
    });
  }

  results() {
    this.router.navigate(['results'])
  }

  openAddSportDialog2(): void {
    let otherSports = [];
    for (let i = 0; i < this.allSports.length; i++) {
      let found = false;
      for (let j = 0; j < this.loggedIn.placeSports.length; j++) {
        if (this.allSports[i].sportName == this.loggedIn.placeSports[j].sportName) {
          found = true;
        }
      }
      if (!found) otherSports.push(this.allSports[i]);
    }


    const dialogRef = this.dialog.open(AddSportDialogComponent, {
      width: '250px',
      data: { allSports: otherSports, newSportInfo: this.newSportInfo },
    });

    dialogRef.afterClosed().subscribe((result: Object) => {
      console.log('The dialog was closed');
      let si = result as SportInfo;
      this.addedSports.push(si);
      this.loggedIn.placeSports.push(si);
      this.sportAdded = true;
    });
  }

  openAddSportDialog3(): void {

    const dialogRef = this.dialog.open(AddSportDialogComponent, {
      width: '250px',
      data: { allSports: this.loggedIn.placeSports, newSportInfo: this.newSportInfo },
    });

    dialogRef.afterClosed().subscribe((result: Object) => {
      console.log('The dialog was closed');
      let si = result as SportInfo;
      for (let i = 0; i < this.loggedIn.placeSports.length; i++) {
        if (this.loggedIn.placeSports[i].sportName == si.sportName) {
          this.loggedIn.placeSports[i].numSlots = si.numSlots;
        }
      }
      //this.addedSports.push(si);
      //this.loggedIn.placeSports.push(si);
      //this.sportAdded = true;
    });
  }

  getMyTournaments() {
    const t1 = { 'sport': 'Mali fudbal', 'date': '21/9/2022', 'status': 'U toku', 'unos': true };
    const t2 = { 'sport': 'Mali fudbal', 'date': '1/10/2022', 'status': 'Prijava', 'unos': false };
    const t3 = { 'sport': 'Mali fudbal', 'date': '19/9/2022', 'status': 'Otkazan', 'unos': false };
    const t4 = { 'sport': 'Mali fudbal', 'date': '11/9/2022', 'status': 'Zavrsen', 'unos': false };

    this.myTournaments = [t1, t2, t3, t4];
  }

  updateSports() {
    this.placeService.updateSports(this.loggedIn.email, this.loggedIn.placeSports).subscribe((sports: Object) => {
      //this.loggedIn.placeSports = this.addedSports;
      localStorage.setItem('currentlyLoggedIn', JSON.stringify(this.loggedIn));
      localStorage.setItem('firstLogin', JSON.stringify('false'));
      location.reload();
    })

  }

}
