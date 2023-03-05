import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from '../models/place';
import { Player } from '../models/player';
import { User } from '../models/user';
import { PlaceService } from '../place.service';
import { PlayerService } from '../player.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private playerService: PlayerService, private router: Router, private placeService: PlaceService) {
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  email: string;
  password: string;



  signIn() {
    this.playerService.login(this.email, this.password).subscribe((player: Object) => {
      let p = player as Player;
      if (p) {
        localStorage.setItem('currentlyLoggedIn', JSON.stringify(p));
        localStorage.setItem('firstLogin', JSON.stringify('false'));
        this.router.navigate(['playerMain']);
      } else {
        // search for place
        this.placeService.login(this.email, this.password).subscribe((place: Object) => {
          let p = place as Place;
          if (p) {
            localStorage.setItem('currentlyLoggedIn', JSON.stringify(p));
            localStorage.setItem('firstLogin', JSON.stringify('false'));
            this.router.navigate(['placeMain']);
          } else {
            alert('Pogresan email ili lozinka!');
            // search for trainer

          }
        })

      }
    })
  }
}
