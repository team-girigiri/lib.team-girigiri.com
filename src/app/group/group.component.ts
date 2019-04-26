import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less']
})
export class GroupComponent implements OnInit {
  @Input() group: string;
  public algorithms = [];
  public data: {[index: string]: string};
  public status = 0;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.getProgramUrlsSuccess = this.getProgramUrlsSuccess.bind(this);
    this.getProgramCommentsSuccess = this.getProgramCommentsSuccess.bind(this);
    this.error = this.error.bind(this);
  }

  ngOnInit() {
    this.getProgramUrls();
    this.getProgramComments();
  }

  getProgramUrls() {
    const apiUrl = `https://api.github.com/repos/xuzijian629/library/contents/${this.group}?ref=master`;
    let get = this.http.get(apiUrl);
    get.subscribe(this.getProgramUrlsSuccess, this.error);
  }

  getProgramComments() {
    const url = `https://raw.githubusercontent.com/xuzijian629/library/master/${this.group}/readme.md`;
    let get = this.http.get(url, { responseType: 'text' });
    get.subscribe(this.getProgramCommentsSuccess, this.error);
  }

  getProgramUrlsSuccess(response) {
    for (let file of response) {
      if (file['name'].match(/.cpp$/)) {
        let name = file['name'].match(/(.*).cpp$/)[1]
        this.algorithms.push(name);
      }
    }
    this.status++;
  }

  getProgramCommentsSuccess(response) {
    this.data = this.parseProgramComments(response);
    this.status++;
  }

  error(error) {
    console.log(error);
  }

  parseProgramComments(s: string) {
    let ret = {};
    let tmp = "";
    let title = "";
    let ok = true;
    for (let line of s.split('\n')) {
      if (line.length == 0) continue;
      let match = line.match(/^# (\S+)$/);
      if (match) {
        if (title.length) {
          ret[title] = tmp;
          tmp = "";
          ok = true;
        }
        title = match[1];
      } else if (ok) {
        if (line[0] == '#') {
          ok = false;
          continue;
        }
        tmp += line + '\n';
      }
    }
    if (title.length) {
      ret[title] = tmp;
    }
    return ret;
  }
}
