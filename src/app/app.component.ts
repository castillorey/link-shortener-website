import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

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
  copyText: string = "Copy";
  validation: string = "";
  
  constructor(
    private _shorten: ShortenService,
    private clipboard: Clipboard
  ){}

  public shorten(): void {
    this.validation = ""; // Clean validations

    if(!this.longUrl || !this.urlIsValid(this.longUrl)){
      this.showError("Please enter a valid URL");
      return;
    }

    this._shorten.shortenUrl(this.longUrl)
    .subscribe(
      (response: BitlyResponse) => this.shortUrl = response.link,
      ({error}: HttpErrorResponse) => this.showError(`${error.message}: ${error.description}`) 
    );
  }

  copyUrl(): void {
    this.clipboard.copy(this.shortUrl);
    this.copyText = "Copied";
    setTimeout(()=> this.copyText = "Copy", 3000);
  }

  private urlIsValid(url: string): boolean {
    const urlPattern: RegExp = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return urlPattern.test(url);
  }

  private showError(message: string): void {
    this.validation = message;
  }
}
