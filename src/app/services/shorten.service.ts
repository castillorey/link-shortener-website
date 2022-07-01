import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BitlyRequest } from '../models/bitlyRequest.model';
import { BitlyResponse } from '../models/bitlyResponse.model';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortenService {
  private payload: BitlyRequest = <BitlyRequest> {
    domain: "bit.ly"
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer ' + environment.bitlyTOKEN
    })
  };
  
  constructor(private api: ApiService) { }

  public shortenUrl(longUrl: string): Observable<BitlyResponse> {
    this.payload.long_url = longUrl;
    return this.api.post("https://api-ssl.bitly.com/v4/shorten", this.payload, this.httpOptions)
    .pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);    //Rethrow it back to component
      })
    );
  }
}

