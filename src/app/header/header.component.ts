import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  public status = 0;
  public profile = {};

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.getProfilePictureSuccess = this.getProfilePictureSuccess.bind(this);
    this.error = this.error.bind(this);
  }

  ngOnInit() {
    this.getProfilePicture('xuzijian629');
    this.getProfilePicture('knshnb');
    this.getProfilePicture('oginging');
  }

  getProfilePicture(username: string) {
    const url = `https://api.github.com/users/${username}`;
    let get = this.http.get(url);
    get.subscribe(this.getProfilePictureSuccess, this.error);
  }

  getProfilePictureSuccess(response: Response) {
    if (response['login'] == "xuzijian629") {
      this.profile["xuzijian629"] = {
        url: this.sanitizer.bypassSecurityTrustUrl(response['avatar_url']),
        twitter: 'https://twitter.com/xuzijian629'
      };
    } else if (response['login'] == "knshnb") {
      this.profile["knshnb"] = {
        url: this.sanitizer.bypassSecurityTrustUrl(response['avatar_url']),
        twitter: 'https://twitter.com/knshnb'
      };
    } else if (response['login'] == "oginging") {
      this.profile["oginging"] = {
        url: this.sanitizer.bypassSecurityTrustUrl(response['avatar_url']),
        twitter: 'https://twitter.com/mgingin142857'
      };
    }
    this.status++;
  }

  error(error) {
    console.error(error);
  }
}
