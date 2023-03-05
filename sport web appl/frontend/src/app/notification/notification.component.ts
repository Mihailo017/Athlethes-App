import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  linkNames = ['Obavestenja', 'Igraj Sada', 'Tim vs Tim', 'Turniri', 'Zajednica', 'Odjava'];
  links = ['notification', 'playNow', 'teamvsteam', 'playerTournaments', 'community', '']
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
