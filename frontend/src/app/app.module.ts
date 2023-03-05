import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayerMainComponent } from './player-main/player-main.component';
import { PlayNowComponent } from './play-now/play-now.component';
import { CommunityComponent } from './community/community.component';
import { TeamvsteamComponent } from './teamvsteam/teamvsteam.component';
import { PlaceMainComponent } from './place-main/place-main.component';
import { PlaceTournamentsComponent } from './place-tournaments/place-tournaments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AddSportDialogComponent } from './add-sport-dialog/add-sport-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { SignUpTimeslotDialogComponent } from './sign-up-timeslot-dialog/sign-up-timeslot-dialog.component';
import { TeamSignUpDialogComponent } from './team-sign-up-dialog/team-sign-up-dialog.component';
import { PlayerTournamentComponent } from './player-tournament/player-tournament.component';
import { MatIconModule } from '@angular/material/icon';
import { MessagesComponent } from './messages/messages.component';
import { NotificationComponent } from './notification/notification.component';
import { ResultsComponent } from './results/results.component';
import { MatGridListModule } from '@angular/material/grid-list';
//import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PlayerMainComponent,
    PlayNowComponent,
    CommunityComponent,
    TeamvsteamComponent,
    PlaceMainComponent,
    PlaceTournamentsComponent,
    AddSportDialogComponent,
    SignUpTimeslotDialogComponent,
    TeamSignUpDialogComponent,
    PlayerTournamentComponent,
    MessagesComponent,
    NotificationComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    HttpClientModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    MatStepperModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
