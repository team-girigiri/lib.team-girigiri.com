import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  public groups = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.getGroupsSuccess = this.getGroupsSuccess.bind(this);
    this.error = this.error.bind(this);
  }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    const apiUrl = 'https://api.github.com/repos/xuzijian629/library/contents';
    let get = this.http.get(apiUrl);
    get.subscribe(this.getGroupsSuccess, this.error);
  }

  getGroupsSuccess(response) {
    for (let file of response) {
      if (!file['download_url']) {
        this.groups.push(file['name']);
      }
    }
  }

  error(error) {
    console.error(error);
  }
}
