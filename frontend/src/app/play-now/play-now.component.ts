import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { FeedInfo } from '../models/feedInfo';
import { Place } from '../models/place';
import { Player } from '../models/player';
import { Request } from '../models/request';
import { Sport } from '../models/sport';
import { SportInfo } from '../models/sportInfo';
import { TeamInfo } from '../models/teamInfo';
import { Timeslot } from '../models/timeslot';
import { PlaceService } from '../place.service';
import { PlayerService } from '../player.service';
import { SignUpTimeslotDialogComponent } from '../sign-up-timeslot-dialog/sign-up-timeslot-dialog.component';
import { TimeslotService } from '../timeslot.service';

const SPORT_WEIGHT = 30;
const PLACE_WEIGHT = 20;
const TIME_WEIGHT = 10;

export interface DialogData {
  timeslot: Timeslot;
  invitedFriends: Player[];
  allFriends: Player[];
}

@Component({
  selector: 'app-play-now',
  templateUrl: './play-now.component.html',
  styleUrls: ['./play-now.component.css']
})
export class PlayNowComponent implements OnInit {



  linkNames = ['Obavestenja', 'Igraj Sada', 'Tim vs Tim', 'Turniri', 'Zajednica', 'Odjava'];
  links = ['notification', 'playNow', 'teamvsteam', 'playerTournaments', 'community', '']
  activeLink = this.links[1];

  constructor(private placeService: PlaceService, private timeslotService: TimeslotService, private playerService: PlayerService, private dialog: MatDialog) {
    this.sport = "";
    this.chooseTeamAndPositionShow = false;
    this.sportPlaces = [];
    this.place = "";
    this.date = new Date;
    this.time = "";

    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Player;
    }

    this.potentialTimeslots = [];
    this.feed = [];
    this.gettingTimeslotsFinished = false;
    this.allFriends = [];

    // old
    this.allSports = [];
    this.placesForChosenSport = [];
    this.chosenSport = new Sport;

    this.timeslot = new Timeslot;

    this.teamChosen = 0;

    this.myFriendsEmail = [];

    this.friendSearch = "";

    this.friends = [];

    this.chosenFriend = "";

    this.updatedSlot = false;
  }

  potentialTimeslots: Timeslot[];

  feed: FeedInfo[];
  gettingTimeslotsFinished: boolean;

  allFriends: Player[];

  // old
  sport: string;
  chooseTeamAndPositionShow: boolean;
  sportPlaces: Place[];
  place: string;
  date: Date;
  time: string;

  loggedIn: Player;

  allSports: Sport[];

  chosenSport: Sport;

  placesForChosenSport: Place[];

  timeslot: Timeslot;

  teamChosen: number;

  myFriendsEmail: string[];

  friendSearch: string;

  friends: Player[];

  chosenFriend: string;

  updatedSlot: boolean;

  ngOnInit(): void {
    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Player;
    }

    this.getPotentialTimeslots();
    this.getAllFriends();


    // old
    this.getAllSports();
    this.getPlacesForCity();
  }

  getPotentialTimeslots() {
    let times = [] as string[]; // pretvori nazive vremena u brojeve , npr uvece u [18,19,20]
    for (let i = 0; i < this.loggedIn.favTimeslots.length; i++) {
      let t = this.getTimesFromName(this.loggedIn.favTimeslots[i])
      times.push(t[0]); times.push(t[1]); times.push(t[2]);
    }

    let info = [{ 'sportName': this.loggedIn.favSports[0].sportName, 'placeName': this.loggedIn.favPlaces[0].placeName },
    { 'sportName': this.loggedIn.favSports[0].sportName, 'placeName': this.loggedIn.favPlaces[1].placeName },
    { 'sportName': this.loggedIn.favSports[1].sportName, 'placeName': this.loggedIn.favPlaces[0].placeName },
    { 'sportName': this.loggedIn.favSports[1].sportName, 'placeName': this.loggedIn.favPlaces[1].placeName }]

    let today = new Date();


    for (let i = 0; i < info.length; i++) {
      for (let d = 0; d < 3; d++) {
        for (let k = 0; k < times.length; k++) {
          let date = new Date();
          date.setDate(today.getDate() + d);
          this.timeslotService.checkAvailability(info[i].placeName, date, times[k], info[i].sportName).subscribe((timeslot: Object) => {
            if (i == info.length - 1 && d == 2 && k == times.length - 1) this.gettingTimeslotsFinished = true;
            let t = timeslot as Timeslot;
            if (t) {
              this.potentialTimeslots.push(t);
            } else {
              t = new Timeslot();
              t.place = info[i].placeName;
              t.date = date;
              t.time = times[k];
              t.sport = info[i].sportName;
              let currSport = info[i].sportName == this.loggedIn.favSports[0].sportName ? this.loggedIn.favSports[0] : this.loggedIn.favSports[1];
              t.t1 = [];
              t.t2 = [];
              for (let j = 0; j < currSport.positions.length; j++) {
                t.t1[j] = new TeamInfo();
                t.t2[j] = new TeamInfo();
                t.t1[j].player = "";
                t.t2[j].player = "";
              }
              this.potentialTimeslots.push(t);
            }
            this.calculateRating(t);
          })
        }
      }
    }
  }

  calculateRating(timeslot: Timeslot) {

    let times = [] as string[]; // pretvori nazive vremena u brojeve , npr uvece u [18,19,20]
    for (let j = 0; j < this.loggedIn.favTimeslots.length; j++) {
      let t = this.getTimesFromName(this.loggedIn.favTimeslots[j])
      times.push(t[0]); times.push(t[1]); times.push(t[2]);
    }

    let sportCoeff = timeslot.sport == this.loggedIn.favSports[0].sportName ? 5 : timeslot.sport == this.loggedIn.favSports[1].sportName ? 3 : 1;
    let placeCoeff = timeslot.place == this.loggedIn.favPlaces[0].placeName ? 5 : timeslot.sport == this.loggedIn.favPlaces[1].placeName ? 3 : 1;
    let timeCoeff = this.calcTimeCoeff(timeslot.time);

    let addOn = 0;

    // Ako u terminu ima bar jedan prijavljen igrac rejting se povecava za 100. Takodje se povecava za 10 za svakog narednog prijavljenog igraca.
    for (let j = 0; j < timeslot.t1.length; j++) {
      if (timeslot.t1[j].player != "") {
        addOn += addOn == 0 ? 100 : 10;
      }
      if (timeslot.t2[j].player != "") {
        addOn += addOn == 0 ? 100 : 10;
      }
    }

    let fi = new FeedInfo();
    fi.timeslot = timeslot;
    fi.date = "" + timeslot.date.getDate() + '/' + (timeslot.date.getMonth() + 1) + '/' + timeslot.date.getFullYear();
    fi.time = timeslot.time + "h"
    fi.rating = sportCoeff * SPORT_WEIGHT + placeCoeff * PLACE_WEIGHT + timeCoeff * TIME_WEIGHT + addOn;

    this.feed.push(fi);
    this.feed.sort((a: FeedInfo, b: FeedInfo) => { return b.rating - a.rating });

  }

  calcTimeCoeff(time: string) {
    let times = [] as string[]; // pretvori nazive vremena u brojeve , npr uvece u [18,19,20]
    for (let i = 0; i < this.loggedIn.favTimeslots.length; i++) {
      let t = this.getTimesFromName(this.loggedIn.favTimeslots[i])
      times.push(t[0]); times.push(t[1]); times.push(t[2]);
    }
    if (time == times[0] || time == times[1] || time == times[2]) return 5;
    else if (time == times[3] || time == times[4] || time == times[5]) return 3;
    else return 1;
  }

  getAllFriends() {

    this.playerService.getAllFriendReqSent(this.loggedIn.email).subscribe((frendships: Object) => {
      let fs = frendships as Request[];
      for (let i = 0; i < fs.length; i++) {
        this.playerService.getPlayer(fs[i].reqReceiver).subscribe((player: Object) => {
          let p = player as Player;
          if (p) {
            this.allFriends.push(p);
          }
        })
      }
      this.playerService.getAllFriendReqReceived(this.loggedIn.email).subscribe((frendships: Object) => {
        let fs = frendships as Request[];
        for (let i = 0; i < fs.length; i++) {
          this.playerService.getPlayer(fs[i].reqSender).subscribe((player: Object) => {
            let p = player as Player;
            if (p) {
              this.allFriends.push(p);
            }
          })
        }
      })
    })
  }

  openSignUpTimeslotDialog(timeslot: Timeslot, i: number) {
    const dialogRef = this.dialog.open(SignUpTimeslotDialogComponent, {
      width: '35%',
      data: { timeslot: timeslot, invitedFriends: [], allFriends: this.allFriends },
    });

    dialogRef.afterClosed().subscribe((result: Object) => {
      console.log('The dialog was closed');
      let friends = result as Player[];
      for (let i = 0; i < timeslot.t1.length; i++) {
        if (timeslot.t1[i].player == "") {
          timeslot.t1[i].player = this.loggedIn.email;
          break;
        } else {
          if (timeslot.t2[i].player == "") {
            timeslot.t1[i].player = this.loggedIn.email;
            break;
          }
        }
      }
      this.feed.splice(i, 1);
      this.timeslotService.reserveTimeslot(timeslot.place, timeslot.date, timeslot.time, timeslot.sport, timeslot.ground, timeslot.t1, timeslot.t2).subscribe();
      for (let i = 0; i < friends.length; i++) {
        this.playerService.sendInvite(timeslot.sport, timeslot.place, timeslot.date, timeslot.time, this.loggedIn.email, friends[i].email).subscribe();
      }
    });
  }

  getTimesFromName(timeslotName: string) {
    if (timeslotName == 'prepodne') return ['9', '10', '11'];
    else
      if (timeslotName == 'poslepodne') return ['12', '13', '14'];
      else
        if (timeslotName == 'predvece') return ['15', '16', '17'];
        else
          if (timeslotName == 'uvece') return ['18', '19', '20'];
          else return [];
  }

  chooseSport() {
    this.sportPlaces = [];
    for (let i = 0; i < this.placesForChosenSport.length; i++) {
      for (let j = 0; j < this.placesForChosenSport[i].placeSports.length; j++) {
        if (this.placesForChosenSport[i].placeSports[j].sportName == this.sport) {
          this.sportPlaces.push(this.placesForChosenSport[i])
        }
      }
    }

    for (let i = 0; i < this.allSports.length; i++) {
      if (this.allSports[i].sportName == this.sport) {
        this.chosenSport = this.allSports[i];
        break;
      }
    }
  }

  getAllSports() {
    this.placeService.getAllSports().subscribe((sports: Object) => {
      let s = sports as Sport[];
      if (s) {
        this.allSports = s;
      } else {
        alert('no sports');
      }
    })
  }

  getPlacesForCity() {
    this.placeService.getPlacesForCity(this.loggedIn.playerCity).subscribe((places: Object) => {
      let p = places as Place[];
      if (p) {
        this.placesForChosenSport = p;
      } else {
        alert('no places for sport');
      }
    })
  }

  checkAvailability() {
    this.timeslotService.checkAvailability(this.place, this.date, this.time, this.sport).subscribe((ts: Object) => {
      let timeslots = ts as Timeslot[];
      this.updatedSlot = false;
      if (timeslots.length > 0) {
        let t1Num = 0;
        let t2Num = 0;
        let si = new SportInfo;
        for (let i = 0; i < this.sportPlaces.length; i++) {
          if (this.sportPlaces[i].placeName == this.place) { // Nadji SportInfo za izabran Sport i Place
            for (let j = 0; j < this.sportPlaces[i].placeSports.length; j++) {
              if (this.sportPlaces[i].placeSports[j].sportName == this.sport) {
                si = this.sportPlaces[i].placeSports[j];
              }
            }
          }
        }
        let ground = 1;
        for (let i = 0; i < timeslots.length; i++) {  // Prolazak kroz sve timeslote za ovaj termin
          for (let j = 0; j < timeslots[i].t1.length; j++) {// Broji koliko ima prijavljenih
            if (timeslots[i].t1[j].player != "") t1Num++;
            if (timeslots[i].t2[j].player != "") t2Num++;
            if (timeslots[i].t1[j].player == this.loggedIn.email) this.teamChosen = 1;
            if (timeslots[i].t2[j].player == this.loggedIn.email) this.teamChosen = 2;
          }

          if (t1Num + t2Num == this.chosenSport.numPlayers) { // Termin popunjen
            ground++;
            continue;
          }

          this.timeslot = timeslots[i];
          this.chooseTeamAndPositionShow = true;
          this.updatedSlot = true;
          return;

        }

        if (ground < si.numSlots) {
          // pravimo novi termin
          this.timeslot.date = this.date;
          this.timeslot.time = this.time;
          this.timeslot.sport = this.sport;
          this.timeslot.ground = ground++;
          this.timeslot.t1 = [];
          this.timeslot.t2 = [];
          for (let i = 0; i < this.chosenSport.positions.length; i++) {
            let ti = new TeamInfo();
            ti.player = "";
            ti.position = this.chosenSport.positions[i];
            this.timeslot.t1.push(ti);

            ti = new TeamInfo();
            ti.player = "";
            ti.position = this.chosenSport.positions[i];
            this.timeslot.t2.push(ti);
          }

          this.chooseTeamAndPositionShow = true;
        } else {
          alert('nema slobodnih termina')
        }



      } else {
        // nema prijavljenih, mi smo prvi
        this.timeslot.place = this.place;
        this.timeslot.date = this.date;
        this.timeslot.time = this.time;
        this.timeslot.sport = this.sport;
        this.timeslot.ground = 1; // prvi teren posto nema nijedan zakazan
        this.timeslot.t1 = [];
        this.timeslot.t2 = [];
        for (let i = 0; i < this.chosenSport.positions.length; i++) {
          let ti = new TeamInfo();
          ti.player = "";
          ti.position = this.chosenSport.positions[i];
          this.timeslot.t1.push(ti);

          ti = new TeamInfo();
          ti.player = "";
          ti.position = this.chosenSport.positions[i];
          this.timeslot.t2.push(ti);
        }

        this.chooseTeamAndPositionShow = true;

      }
    })
  }

  searchFriend() {
    let substring = this.friendSearch.split(' ');
    let firstName = substring[0];
    let lastName = substring[1];
    this.playerService.getPlayerForName(firstName, lastName).subscribe((players: Object) => {
      let p = players as Player[];
      for (let i = 0; i < p.length; i++) {
        this.playerService.checkFriendship(this.loggedIn.email, p[i].email).subscribe((frendship: Object) => {
          let fs = frendship as Request[];
          if (fs.length > 0) {
            this.friends.push(p[i]);
          }
        })
        this.playerService.checkFriendship(p[i].email, this.loggedIn.email).subscribe((frendship: Object) => {
          let fs = frendship as Request[];
          if (fs.length > 0) {
            this.friends.push(p[i]);
          }
        })
      }
    })
  }

  inviteSelectedFriend(teamInfo: TeamInfo) {
    teamInfo.player = this.chosenFriend;
  }

  chooseTeamAndPosition(teamInfo: TeamInfo, team: number) {
    teamInfo.player = this.loggedIn.email;
    this.teamChosen = team;
  }

  removeSelfFromTeam() {
    let team = this.teamChosen == 1 ? this.timeslot.t1 : this.timeslot.t2;
    for (let i = 0; i < team.length; i++) {
      if (team[i].player == this.loggedIn.email) {
        team[i].player = "";
        break;
      }
    }
    this.teamChosen = 0;
  }

  reserveSlot() {
    // let team1 = [];
    // let team2 = [];
    // for (let i=0; i < this.timeslot.t1.length; i++) {
    //   team1.push(this.timeslot.t1[i].player);
    //   team2.push(this.timeslot.t2[i].player);
    // }

    this.timeslotService.reserveTimeslot(this.place, this.date, this.time, this.sport, this.timeslot.ground, this.timeslot.t1, this.timeslot.t2).subscribe();
  }

  updateSlot() {
    this.timeslotService.updateSlot(this.place, this.date, this.time, this.sport, this.timeslot.ground, this.timeslot.t1, this.timeslot.t2).subscribe();
  }



}
