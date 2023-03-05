import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sport } from './models/sport';
import { SportInfo } from './models/sportInfo';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  registerPlace(
    email: string,
    password: string,
    placeName: string,
    placeCity: string,
    placeAddress: string) {
    const data = {
      email: email,
      password: password,
      placeName: placeName,
      placeCity: placeCity,
      placeAddress: placeAddress,
      placeSports: []
    }

    return this.http.post(`${this.uri}/place/register`, data);
  }

  updateSports(
    email: string,
    placeSports: SportInfo[]) {
    const data = {
      email: email,
      placeSports: placeSports
    }

    return this.http.post(`${this.uri}/place/updateSports`, data);
  }

  getPlacesForSport(sport: string) {
    const data = {
      sport: sport
    }

    return this.http.post(`${this.uri}/place/getPlacesForSport`, data);
  }

  getAllSports() {
    return this.http.get(`${this.uri}/place/getAllSports`);
  }

  getPlacesForCity(placeCity: string) {
    const data = {
      placeCity: placeCity
    }
    return this.http.post(`${this.uri}/place/getPlacesForCity`, data);
  }

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    }

    return this.http.post(`${this.uri}/place/login`, data);
  }

  makeTournament(placeName: string, sportName: string, date: Date) {
    const data = {
      placeName: placeName,
      sportName: sportName,
      date: date
    }

    return this.http.post(`${this.uri}/place/makeTournament`, data);
  }

  getOpenTournaments() {
    const data = {
      placeName: 1
    }

    return this.http.post(`${this.uri}/place/getOpenTournaments`, data);
  }

  getSport(sportName: string) {
    const data = {
      sportName: sportName
    }
    return this.http.get(`${this.uri}/place/getSport`);
  }
}
