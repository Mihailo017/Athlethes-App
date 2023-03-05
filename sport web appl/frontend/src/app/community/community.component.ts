import { Component, OnInit } from '@angular/core';
import { Player } from '../models/player';
import { PlayerService } from '../player.service';
import { Request } from '../models/request'
import { Router } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  linkNames = ['Obavestenja', 'Igraj Sada', 'Tim vs Tim', 'Turniri', 'Zajednica', 'Odjava'];
  links = ['notification', 'playNow', 'teamvsteam', 'playerTournaments', 'community', '']
  activeLink = this.links[4];

  constructor(private playerService: PlayerService, private router: Router) {
    this.playerSearch = "";
    this.players = [];
    this.chosenPlayer = "";

    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Player;
    }
    this.myRequests = [];

    this.myFriends = [];
  }

  myFriends: Player[];

  playerSearch: string;
  players: Player[];
  chosenPlayer: string;

  loggedIn: Player;

  myRequests: Request[];

  ngOnInit(): void {
    let s = localStorage.getItem('currentlyLoggedIn');
    if (s) {
      this.loggedIn = JSON.parse(s);
    }
    else {
      // should not happen
      this.loggedIn = new Player;
    }

    this.getPendingRequests();
    this.getAllFriends();
  }

  searchPlayer() {
    let substring = this.playerSearch.split(' ');
    let firstName = substring[0];
    let lastName = substring[1];
    this.playerService.getPlayerForName(firstName, lastName).subscribe((players: Object) => {
      let p = players as Player[];
      this.players = p;
    })
  }

  sendFriendRequest(player: Player) {
    this.playerService.sendFriendRequest(this.loggedIn.email, player.email).subscribe((friend: Object) => {
      alert('ok');
    })
  }

  getPendingRequests() {
    this.playerService.getPendingRequests(this.loggedIn.email).subscribe((requests: Object) => {
      this.myRequests = requests as Request[];
    })
  }

  accept(req: Request) {
    this.playerService.acceptRequest(req).subscribe((req: Object) => {
      alert('ok');
      this.router.navigate(['community'])
    })
  }

  sendMessage(receiver: Player) {
    this.router.navigate(['messages'])
  }

  getAllFriends() {

    this.playerService.getAllFriendReqSent(this.loggedIn.email).subscribe((frendships: Object) => {
      let fs = frendships as Request[];
      for (let i = 0; i < fs.length; i++) {
        this.playerService.getPlayer(fs[i].reqReceiver).subscribe((player: Object) => {
          let p = player as Player;
          if (p) {
            this.myFriends.push(p);
          }
        })
      }
      this.playerService.getAllFriendReqReceived(this.loggedIn.email).subscribe((frendships: Object) => {
        let fs = frendships as Request[];
        for (let i = 0; i < fs.length; i++) {
          this.playerService.getPlayer(fs[i].reqSender).subscribe((player: Object) => {
            let p = player as Player;
            if (p) {
              this.myFriends.push(p);
            }
          })
        }
      })
    })
  }



}
