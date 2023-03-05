import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSportDialogComponent } from '../add-sport-dialog/add-sport-dialog.component';
import { Place } from '../models/place';
import { Player } from '../models/player';
import { Sport } from '../models/sport';
import { Timeslot } from '../models/timeslot';
import { PlaceService } from '../place.service';
import { PlayerService } from '../player.service';

export class TimeslotData {
  'sport': string;
  'place': string;
  'date': string;
  'time': string;
  'status': string;
  'standings': string;
}

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['./player-main.component.css']
})
export class PlayerMainComponent implements OnInit {

  linkNames = ['Obavestenja', 'Igraj Sada', 'Tim vs Tim', 'Turniri', 'Zajednica', 'Odjava'];
  links = ['notification', 'playNow', 'teamvsteam', 'playerTournaments', 'community', '']
  activeLink = this.links[0];




  constructor(private placeService: PlaceService, private playerService: PlayerService) {
    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Player;
    }

    this.firstLogin = false;

    this.allSports = [];
    this.chosenSports = [];

    this.myTimeslots = [];
    this.myTournaments = [];

    this.placesForPlayerCity = [];
    this.chosenPlaces = [];
    this.chosenTimeslots = [];
  }

  loggedIn: Player;
  firstLogin: boolean;
  allSports: Sport[];
  chosenSports: Sport[];

  myTimeslots: TimeslotData[];
  myTournaments: TimeslotData[];

  placesForPlayerCity: Place[];
  chosenPlaces: Place[];
  chosenTimeslots: string[];

  ngOnInit(): void {
    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
    }

    s = localStorage.getItem('firstLogin');
    if (s) {
      this.firstLogin = JSON.parse(s) == 'true' ? true : false;
    }
    else {
      // should not happen
    }

    this.getAllSports();
    this.getPlacesForCity();
    this.getMyTimeslots();
    this.getMyTournaments();
  }

  getAllSports() {
    this.placeService.getAllSports().subscribe((sports: Object) => {
      this.allSports = sports as Sport[];
    })
  }

  getPlacesForCity() {
    this.placeService.getPlacesForCity(this.loggedIn.playerCity).subscribe((places: Object) => {
      let p = places as Place[];
      if (p) {
        this.placesForPlayerCity = p;
      } else {
        alert('no places for sport');
      }
    })
  }

  getMyTimeslots() {
    const t1 = { 'sport': 'Mali fudbal', 'place': 'Balon Enfild', 'date': '5/10/2022', 'time': '11h', 'status': 'prijavljen', 'standings': "a" };
    const t2 = { 'sport': 'Basket', 'place': 'Olimp kosarkaski tereni', 'date': '21/9/2022', 'time': '9h', 'status': 'zavrsen', 'standings': "a" };
    const t3 = { 'sport': 'Mali fudbal', 'place': 'Balon Enfild', 'date': '18/9/2022', 'time': '15h', 'status': 'zavrsen', 'standings': "a" };
    const t4 = { 'sport': 'Mali fudbal', 'place': 'Balon Trudbenik', 'date': '27/8/2022', 'time': '11h', 'status': 'zavrsen', 'standings': "a" };
    const t5 = { 'sport': 'Basket', 'place': 'Olimp kosarkaski tereni', 'date': '20/8/2022', 'time': '9h', 'status': 'zavrsen', 'standings': "a" };

    this.myTimeslots = [t1, t2, t3, t4, t5];
  }

  getMyTournaments() {
    const t1 = { 'sport': 'Mali fudbal', 'place': 'Balon Enfild', 'date': '10/10/2022', 'time': '', 'status': 'prijavljen', 'standings': "" };
    const t2 = { 'sport': 'Mali fudbal', 'place': 'Balon Trudbenik', 'date': '9/9/2022', 'time': '', 'status': 'zavrsen', 'standings': "Cetvrt finale" };

    this.myTournaments = [t1, t2];
  }

  confirmData() {
    this.loggedIn.favSports = this.chosenSports;
    this.loggedIn.favPlaces = this.chosenPlaces;
    this.loggedIn.favTimeslots = this.chosenTimeslots;

    this.playerService.updatePlayerFavs(this.loggedIn.email, this.chosenSports, this.chosenPlaces, this.chosenTimeslots).subscribe(
      (places: Object) => {
        localStorage.setItem('firstLogin', JSON.stringify('false'));
        location.reload();
      }
    )


  }

}
