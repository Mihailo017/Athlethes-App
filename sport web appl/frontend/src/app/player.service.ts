import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Place } from './models/place';
import { Player } from './models/player';
import { Request } from './models/request';
import { Sport } from './models/sport';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  registerPlayer(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    playerCity: string,
    playerAddress: string) {
    const data = {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      playerCity: playerCity,
      playerAddress: playerAddress
    }

    return this.http.post(`${this.uri}/player/register`, data);
  }

  getPlayerForName(firstName: string, lastName: string) {
    const data = {
      firstName: firstName,
      lastName: lastName
    }
    return this.http.post(`${this.uri}/player/getPlayerForName`, data);
  }

  getPlayer(email: string) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/player/getPlayer`, data);
  }

  sendFriendRequest(reqSender: string, reqReceiver: string) {
    const data = {
      reqSender: reqSender,
      reqReceiver: reqReceiver
    }
    return this.http.post(`${this.uri}/player/sendReq`, data);
  }

  getPendingRequests(email: string) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/player/getPendingRequests`, data);
  }

  getAllFriendReqSent(email: string) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/player/getAllFriendReqSent`, data);
  }

  getAllFriendReqReceived(email: string) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/player/getAllFriendReqReceived`, data);
  }

  acceptRequest(req: Request) {
    const data = {
      reqSender: req.reqSender,
      reqReceiver: req.reqReceiver
    }
    return this.http.post(`${this.uri}/player/acceptRequest`, data);
  }

  checkFriendship(reqSender: string, reqReceiver: string) {
    const data = {
      reqSender: reqSender,
      reqReceiver: reqReceiver
    }
    return this.http.post(`${this.uri}/player/checkFriendship`, data);
  }

  sendInvite(sport: string, place: string, date: Date, time: string, invSender: string, invReceiver: string) {
    const data = {
      sport: sport,
      place: place,
      date: date,
      time: time,
      invSender: invSender,
      invReceiver: invReceiver
    }
    return this.http.post(`${this.uri}/player/sendInvite`, data);
  }

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    }

    return this.http.post(`${this.uri}/player/login`, data);
  }

  updatePlayerFavs(email: string, favSports: Sport[], favPlaces: Place[], favTimeslots: string[]) {
    const data = {
      email: email,
      favSports: favSports,
      favPlaces: favPlaces,
      favTimeslots: favTimeslots
    }

    return this.http.post(`${this.uri}/player/updatePlayerFavs`, data);
  }
}
