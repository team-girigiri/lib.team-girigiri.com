import { Component, OnInit, SecurityContext, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeScript, SafeValue } from '@angular/platform-browser';
import * as marked from 'marked';

@Component({
  selector: 'app-algorithm-detail',
  templateUrl: './algorithm-detail.component.html',
  styleUrls: ['./algorithm-detail.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AlgorithmDetailComponent implements OnInit {
  private group: string;
  private name: string;
  public code: SafeValue;
  private data: {[index: string]: string};
  public comment: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.showDetailSuccess = this.showDetailSuccess.bind(this);
    this.getProgramCommentsSuccess = this.getProgramCommentsSuccess.bind(this);
    this.error = this.error.bind(this);
    route.params.subscribe(params => {
      this.group = params['group'];
      this.name = params['algorithm'];
      this.showDetail();
      this.getProgramComments();
    });
  }

  ngOnInit() {
  }

  showDetail() {
    const url = `https://raw.githubusercontent.com/xuzijian629/library/master/${this.group}/${this.name}.cpp`;
    let get = this.http.get(url, { responseType: 'text' });
    get.subscribe(this.showDetailSuccess, this.error);
  }

  getProgramComments() {
    const url = `https://raw.githubusercontent.com/xuzijian629/library/master/${this.group}/readme.md`;
    let get = this.http.get(url, { responseType: 'text' });
    get.subscribe(this.getProgramCommentsSuccess, this.error);
  }

  showDetailSuccess(response) {
    this.code = this.sanitizer.sanitize(SecurityContext.NONE, response);
    setTimeout(PR.prettyPrint, 100);
  }

  getProgramCommentsSuccess(response) {
    this.data = this.parseProgramComments(response);
    this.comment = this.sanitizer.bypassSecurityTrustHtml(marked(this.data[this.name]));
  }

  error(error) {
    console.error(error);
  }

  parseProgramComments(s: string) {
    let ret = {};
    let tmp = "";
    let title = "";
    for (let line of s.split('\n')) {
      if (line.length == 0) continue;
      let match = line.match(/^# (\S+)$/);
      if (match) {
        if (title.length) {
          ret[title] = tmp;
          tmp = "";
        }
        title = match[1];
      } else {
        tmp += line + '\n';
      }
    }
    if (title.length) {
      ret[title] = tmp;
    }
    return ret;
  }
}
