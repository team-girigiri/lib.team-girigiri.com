import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less']
})
export class GroupComponent implements OnInit {
  @Input() group: string;
  public algorithms = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.getProgramUrlsSuccess = this.getProgramUrlsSuccess.bind(this);
    this.error = this.error.bind(this);
  }

  ngOnInit() {
    this.getProgramUrls();
  }

  getProgramUrls() {
    const apiUrl = `https://api.github.com/repos/xuzijian629/library/contents/${this.group}?ref=master`;
    let get = this.http.get(apiUrl);
    get.subscribe(this.getProgramUrlsSuccess, this.error);
  }

  getProgramUrlsSuccess(response) {
    for (let file of response) {
      if (file['name'].match(/.cpp$/)) {
        let name = file['name'].match(/(.*).cpp$/)[1]
        this.algorithms.push(name);
      }
    }
  }

  error(error) {
    console.log(error);
  }
}
