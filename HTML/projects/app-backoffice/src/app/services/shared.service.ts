import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private _httpClient: HttpClient
  ) {
    console.log();
  }

  // REALIZA O LOGIN NA PLATAFORMA********************************************
  login(body) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this._httpClient.post(environment.url_api + 'users/authenticate', body, { headers });
  }



}
