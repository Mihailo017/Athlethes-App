import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  signInService(email:string , password:string) {
    const data = {
      email: email,
      password: password
    }

    return this.http.post(`${this.uri}/player/login`, data);
  }
}
