import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from '../models/place';
import { Player } from '../models/player';
import { Sport } from '../models/sport';
import { SportInfo } from '../models/sportInfo';
import { PlaceService } from '../place.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private playerService: PlayerService, private placeService: PlaceService, private router: Router) {
    this.isChosenPlayer = false;
    this.isChosenPlace = false;
    this.isChosenTrainer = false;

    this.username = "";
    this.email = "";
    this.password = "";
    this.passwordCheck = "";
    this.firstName = "";
    this.lastName = "";
    this.playerCity = "";
    this.playerAddress = "";
    this.placeName = "";
    this.placeCity = "";
    this.placeSport = "";
    this.placeAddress = "";
    this.allSports = [];
    this.placeChosenSportName = "";
    this.placeChosenSportNumSlots = 0;
    this.placeSports = [];
  }

  username: string;
  email: string;
  password: string;
  passwordCheck: string;
  firstName: string;
  lastName: string;
  playerCity: string;
  playerAddress: string;

  placeName: string;
  placeCity: string;
  placeSport: string;
  placeAddress: string;

  isChosenPlayer: boolean;
  isChosenPlace: boolean;
  isChosenTrainer: boolean;

  allSports: Sport[];

  placeChosenSportName: string;
  placeChosenSportNumSlots: number;

  placeSports: SportInfo[];

  choosePlayer() {
    this.isChosenPlayer = true;
    this.isChosenPlace = false;
    this.isChosenTrainer = false;
  }

  choosePlace() {
    this.isChosenPlayer = false;
    this.isChosenPlace = true;
    this.isChosenTrainer = false;
  }

  chooseTrainer() {
    this.isChosenPlayer = false;
    this.isChosenPlace = false;
    this.isChosenTrainer = true;
  }

  registerPlayer() {
    this.playerService.registerPlayer(this.username, this.email, this.password, this.firstName, this.lastName, this.playerCity, this.playerAddress).subscribe((player: Object) => {
      let p = player as Player;
      if (p) {
        p = new Player();
        p.email = this.email;
        p.password = this.password;
        p.firstName = this.firstName;
        p.lastName = this.lastName;
        p.playerCity = this.playerCity;
        p.playerAddress = this.placeAddress;
        localStorage.setItem('currentlyLoggedIn', JSON.stringify(p));
        localStorage.setItem('firstLogin', JSON.stringify('true'));
        this.router.navigate(['playerMain'])
      } else {
        alert('no player');
      }
    })
  }

  registerPlace() {
    this.placeService.registerPlace(this.email, this.password, this.placeName, this.placeCity, this.placeAddress).subscribe((place: Object) => {
      let p = place as Place;
      if (p) {
        localStorage.setItem('currentlyLoggedIn', JSON.stringify(p));
        localStorage.setItem('firstLogin', JSON.stringify('true'));
        this.router.navigate(['placeMain'])
      } else {
        alert('no place');
      }
    })
  }

  getAllSports() {
    this.placeService.getAllSports().subscribe((sports: Object) => {
      this.allSports = sports as Sport[];
    })
  }

  addPlaceSport() {
    let si = new SportInfo();
    si.sportName = this.placeChosenSportName;
    si.numSlots = this.placeChosenSportNumSlots;
    this.placeSports.push(si);
  }

  ngOnInit(): void {
    this.getAllSports();
  }

}
