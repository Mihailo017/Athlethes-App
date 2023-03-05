import { Component, OnInit } from '@angular/core';
import { Place } from '../models/place';
import { Sport } from '../models/sport';
import { PlaceService } from '../place.service';
import { TimeslotService } from '../timeslot.service';
import { TeamInfo } from '../models/teamInfo';

@Component({
  selector: 'app-place-tournaments',
  templateUrl: './place-tournaments.component.html',
  styleUrls: ['./place-tournaments.component.css']
})
export class PlaceTournamentsComponent implements OnInit {

  linkNames = ['Moj profil', 'Napravi turnir'];
  links = ['placeMain', 'placeTournaments']
  activeLink = this.links[1];

  constructor(private placeService: PlaceService, private timeslotService: TimeslotService) {
    let s = localStorage.getItem('placeLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Place;
    }
    this.sport = "";
    this.numTeams = 0;
    this.date = "new Date";
    this.mySports = [];

    this.chosenSport = new Sport;
  }

  sport: string;
  numTeams: number;
  date: string;

  mySports: Sport[];

  loggedIn: Place;

  chosenSport: Sport;

  ngOnInit(): void {
    let s = localStorage.getItem('placeLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Place;
    }

    // treba da dohvati samo sportove za place
    this.getAllSports();
    //this.getMySports();
  }

  getAllSports() {
    this.placeService.getAllSports().subscribe((sports: Object) => {
      let s = sports as Sport[];
      if (s) {
        this.mySports = [];
        for (let i = 0; i < s.length; i++) {
          for (let j = 0; j < this.loggedIn.placeSports.length; j++) {
            if (s[i].sportName == this.loggedIn.placeSports[j].sportName) {
              this.mySports.push(s[i]);
            }
          }
        }
      } else {
        alert('no sports');
      }
    })
  }

  chooseSport() {
    for (let i = 0; i < this.mySports.length; i++) {
      if (this.mySports[i].sportName == this.sport) {
        this.chosenSport = this.mySports[i];
        break;
      }
    }

  }

  makeTournament() {
    let times = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']

    let t1 = [];
    let t2 = [];
    for (let i = 0; i < this.chosenSport.positions.length; i++) {
      let ti = new TeamInfo();
      ti.player = "";
      ti.position = this.chosenSport.positions[i];
      t1.push(ti);

      ti = new TeamInfo();
      ti.player = "";
      ti.position = this.chosenSport.positions[i];
      t2.push(ti);
    }

    let numMatches = this.numTeams;
    let d = new Date(this.date);

    this.placeService.makeTournament(this.loggedIn.placeName, this.chosenSport.sportName, d).subscribe();
    while (true) {
      numMatches = numMatches / 2;
      for (let i = 0; i < numMatches; i++) {
        this.timeslotService.reserveTimeslot(this.loggedIn.placeName, d, times[i], this.sport, 1, t1, t2).subscribe()
      }
      d.setDate(d.getDate() + 1);
      //this.date = tomorrow;
      if (numMatches == 1) break;
    }



  }



}
