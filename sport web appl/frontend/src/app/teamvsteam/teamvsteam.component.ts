import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Place } from '../models/place';
import { Player } from '../models/player';
import { Request } from '../models/request';
import { Sport } from '../models/sport';
import { SportInfo } from '../models/sportInfo';
import { TeamInfo } from '../models/teamInfo';
import { Timeslot } from '../models/timeslot';
import { PlaceService } from '../place.service';
import { PlayerService } from '../player.service';
import { TeamSignUpDialogComponent } from '../team-sign-up-dialog/team-sign-up-dialog.component';
import { TimeslotService } from '../timeslot.service';

@Component({
  selector: 'app-teamvsteam',
  templateUrl: './teamvsteam.component.html',
  styleUrls: ['./teamvsteam.component.css']
})
export class TeamvsteamComponent implements OnInit {

  linkNames = ['Obavestenja', 'Igraj Sada', 'Tim vs Tim', 'Turniri', 'Zajednica', 'Odjava'];
  links = ['notification', 'playNow', 'teamvsteam', 'playerTournaments', 'community', '']
  activeLink = this.links[2];

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

    this.chosenSport = new Sport();
    this.chosenPlace = new Place();
    this.allFriends = [];
    // old

    this.allSports = [];
    this.placesForChosenSport = [];


    this.timeslot = new Timeslot;

    this.teamChosen = false;

    this.chosenFriend = "";

    this.friendSearch = "";

    this.friends = [];
  }

  chosenSport: Sport;
  chosenPlace: Place;
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



  placesForChosenSport: Place[];

  timeslot: Timeslot;

  teamChosen: boolean;

  chosenFriend: string;

  friendSearch: string;

  friends: Player[];

  ngOnInit(): void {
    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Player;
    }

    this.getAllSports();
    this.getPlacesForCity();
    this.getAllFriends();
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

  chooseSport() {
    this.sportPlaces = [];
    for (let i = 0; i < this.placesForChosenSport.length; i++) {
      for (let j = 0; j < this.placesForChosenSport[i].placeSports.length; j++) {
        if (this.placesForChosenSport[i].placeSports[j].sportName == this.chosenSport.sportName) {
          this.sportPlaces.push(this.placesForChosenSport[i])
        }
      }
    }

    // for (let i = 0; i < this.allSports.length; i++) {
    //   if (this.allSports[i].sportName == this.sport) {
    //     this.chosenSport = this.allSports[i];
    //     break;
    //   }
    // }
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

  checkAvailability() {
    this.timeslotService.checkAvailability(this.chosenPlace.placeName, this.date, this.time, this.chosenSport.sportName).subscribe((ts: Object) => {
      let timeslots = ts as Timeslot[];
      let timeslot = new Timeslot();
      if (timeslots) {
        // termin nije slobodan
      } else {
        // nema prijavljenih, mi smo prvi
        let t1 = []; let t2 = [];
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

        timeslot.place = this.chosenPlace.placeName;
        timeslot.date = this.date;
        timeslot.time = this.time;
        timeslot.sport = this.chosenSport.sportName;
        timeslot.t1 = t1;
        timeslot.t2 = t2;
      }

      const dialogRef = this.dialog.open(TeamSignUpDialogComponent, {
        width: '35%',
        data: { timeslot: timeslot, invitedFriends: [], allFriends: this.allFriends },
      });

      dialogRef.afterClosed().subscribe((result: Object) => {
        console.log('The dialog was closed');

        timeslot.t1[0].player = this.loggedIn.email;
        this.timeslotService.reserveTimeslot(timeslot.place, timeslot.date, timeslot.time, timeslot.sport, timeslot.ground, timeslot.t1, timeslot.t2).subscribe();

        let friends = result as Player[];
        for (let i = 0; i < friends.length; i++) {
          this.playerService.sendInvite(timeslot.sport, timeslot.place, timeslot.date, timeslot.time, this.loggedIn.email, friends[i].email).subscribe();
        }
      });

    })
  }

  // checkAvailability() {
  //   this.timeslotService.checkAvailability(this.chosenPlace.placeName, this.date, this.time, this.chosenSport.sportName).subscribe((ts: Object) => {
  //     let timeslots = ts as Timeslot[];
  //     if (timeslots.length > 0) {
  //       let si = new SportInfo;
  //       for (let i = 0; i < this.sportPlaces.length; i++) {
  //         if (this.sportPlaces[i].placeName == this.place) { // Nadji SportInfo za izabran Sport i Place
  //           for (let j = 0; j < this.sportPlaces[i].placeSports.length; j++) {
  //             if (this.sportPlaces[i].placeSports[j].sportName == this.sport) {
  //               si = this.sportPlaces[i].placeSports[j];
  //             }
  //           }
  //         }
  //       }
  //       let ground = timeslots.length; // Posto je team vs team treba iskljucivo prazam timeslot

  //       if (ground < si.numSlots) {
  //         // pravimo novi termin
  //         this.timeslot.date = this.date;
  //         this.timeslot.time = this.time;
  //         this.timeslot.sport = this.sport;
  //         this.timeslot.ground = ground++;
  //         this.timeslot.t1 = [];
  //         this.timeslot.t2 = [];
  //         for (let i = 0; i < this.chosenSport.positions.length; i++) {
  //           let ti = new TeamInfo();
  //           ti.player = "";
  //           ti.position = this.chosenSport.positions[i];
  //           this.timeslot.t1.push(ti);

  //           ti = new TeamInfo();
  //           ti.player = "";
  //           ti.position = this.chosenSport.positions[i];
  //           this.timeslot.t2.push(ti);
  //         }

  //         this.chooseTeamAndPositionShow = true;
  //       } else {
  //         alert('nema slobodnih termina')
  //       }



  //     } else {
  //       // nema prijavljenih, mi smo prvi
  //       this.timeslot.place = this.place;
  //       this.timeslot.date = this.date;
  //       this.timeslot.time = this.time;
  //       this.timeslot.sport = this.sport;
  //       this.timeslot.ground = 1; // prvi teren posto nema nijedan zakazan
  //       this.timeslot.t1 = [];
  //       this.timeslot.t2 = [];
  //       for (let i = 0; i < this.chosenSport.positions.length; i++) {
  //         let ti = new TeamInfo();
  //         ti.player = "";
  //         ti.position = this.chosenSport.positions[i];
  //         this.timeslot.t1.push(ti);

  //         ti = new TeamInfo();
  //         ti.player = "";
  //         ti.position = this.chosenSport.positions[i];
  //         this.timeslot.t2.push(ti);
  //       }

  //       this.chooseTeamAndPositionShow = true;

  //     }
  //   })
  // }

  inviteSelectedFriend(teamInfo: TeamInfo) {
    teamInfo.player = this.chosenFriend;
  }

  chooseTeamAndPosition(teamInfo: TeamInfo) {
    teamInfo.player = this.loggedIn.email;
    this.teamChosen = true;
  }

  removeSelfFromTeam() {
    for (let i = 0; i < this.timeslot.t1.length; i++) {
      if (this.timeslot.t1[i].player == this.loggedIn.email) {
        this.timeslot.t1[i].player = "";
        break;
      }
      if (this.timeslot.t2[i].player == this.loggedIn.email) {
        this.timeslot.t2[i].player = "";
        break;
      }
    }
    this.teamChosen = false;
  }

  reserveSlot() {
    this.timeslotService.reserveTimeslot(this.place, this.date, this.time, this.sport, this.timeslot.ground, this.timeslot.t1, this.timeslot.t2).subscribe();
  }



}
