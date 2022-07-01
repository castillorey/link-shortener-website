import { Component } from '@angular/core';
import { BitlyResponse } from './models/bitlyResponse.model';
import { ShortenService } from './services/shorten.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  longUrl : string = "";
  shortUrl: string = "";
  
  constructor(private _shorten: ShortenService){}


  public shorten(): void {
    if(!this.longUrl)
      return;

    this._shorten.shortenUrl(this.longUrl)
    .subscribe((response: BitlyResponse) => {
      this.shortUrl = response.link;
    });
  }
}
