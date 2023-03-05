import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityComponent } from './community/community.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationComponent } from './notification/notification.component';
import { PlaceMainComponent } from './place-main/place-main.component';
import { PlaceTournamentsComponent } from './place-tournaments/place-tournaments.component';
import { PlayNowComponent } from './play-now/play-now.component';
import { PlayerMainComponent } from './player-main/player-main.component';
import { PlayerTournamentComponent } from './player-tournament/player-tournament.component';
import { RegisterComponent } from './register/register.component';
import { ResultsComponent } from './results/results.component';
import { TeamvsteamComponent } from './teamvsteam/teamvsteam.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'playerMain', component: PlayerMainComponent },
  { path: 'playNow', component: PlayNowComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'teamvsteam', component: TeamvsteamComponent },
  { path: 'placeMain', component: PlaceMainComponent },
  { path: 'placeTournaments', component: PlaceTournamentsComponent },
  { path: 'playerTournaments', component: PlayerTournamentComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
