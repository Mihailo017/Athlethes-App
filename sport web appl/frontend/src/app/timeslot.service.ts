import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamInfo } from './models/teamInfo';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  checkAvailability(
    place: string,
    date: Date,
    time: string,
    sport: string) {
    const data = {
      place: place,
      date: date,
      time: time,
      sport: sport
    }

    return this.http.post(`${this.uri}/timeslot/checkAvailability`, data);
  }

  reserveTimeslot(
    place: string,
    date: Date,
    time: string,
    sport: string,
    ground: number,
    t1: TeamInfo[],
    t2: TeamInfo[]) {
    const data = {
      place: place,
      date: date,
      time: time,
      sport: sport,
      ground: ground,
      t1: t1,
      t2: t2
    }

    return this.http.post(`${this.uri}/timeslot/reserve`, data);
  }

  updateSlot(
    place: string,
    date: Date,
    time: string,
    sport: string,
    ground: number,
    t1: TeamInfo[],
    t2: TeamInfo[]) {
    const data = {
      place: place,
      date: date,
      time: time,
      sport: sport,
      ground: ground,
      t1: t1,
      t2: t2
    }

    return this.http.post(`${this.uri}/timeslot/update`, data);
  }

  getTimeslotsForSportAndPlace(
    place: string,
    sport: string) {
    const data = {
      place: place,
      sport: sport
    }

    return this.http.post(`${this.uri}/timeslot/getTimeslotsForSportAndPlace`, data);
  }

}
