import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../place.service';
import { Tournament } from '../models/tournament'

@Component({
  selector: 'app-player-tournament',
  templateUrl: './player-tournament.component.html',
  styleUrls: ['./player-tournament.component.css']
})
export class PlayerTournamentComponent implements OnInit {



  linkNames = ['Obavestenja', 'Igraj Sada', 'Tim vs Tim', 'Turniri', 'Zajednica', 'Odjava'];
  links = ['notification', 'playNow', 'teamvsteam', 'playerTournaments', 'community', '']
  activeLink = this.links[3];

  constructor(private placeService: PlaceService) {
    this.openTournaments = [];
  }

  openTournaments: Tournament[];

  ngOnInit(): void {

    this.placeService.getOpenTournaments().subscribe((tournaments: Object) => {
      let t = tournaments as Tournament[];
      if (t) {
        this.openTournaments = t;
      } else {
        alert('no sports');
      }
    })
  }

}
