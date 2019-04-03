import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public profilePictureLoaded: boolean = true;
  public profilePictureUrl: SafeResourceUrl;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.getProfilePictureSuccess = this.getProfilePictureSuccess.bind(this);
    this.error = this.error.bind(this);
  }

  ngOnInit() {
    this.getProfilePicture();
  }

  getProfilePicture() {
    const url = 'https://api.github.com/users/xuzijian629';
    let get = this.http.get(url);
    get.subscribe(this.getProfilePictureSuccess, this.error);
  }

  getProfilePictureSuccess(response: Response) {
    this.profilePictureUrl = this.sanitizer.bypassSecurityTrustUrl(response['avatar_url']);
    this.profilePictureLoaded = true;
  }

  error(error) {
    console.error(error);
  }
}
