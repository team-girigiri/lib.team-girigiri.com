import { Component, OnInit, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeScript, SafeValue } from '@angular/platform-browser';

@Component({
  selector: 'app-algorithm-detail',
  templateUrl: './algorithm-detail.component.html',
  styleUrls: ['./algorithm-detail.component.less']
})
export class AlgorithmDetailComponent implements OnInit {
  private group: string;
  private name: string;
  public code: SafeValue;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.showDetailSuccess = this.showDetailSuccess.bind(this);
    this.error = this.error.bind(this);
    route.params.subscribe(params => {
      this.group = params['group'];
      this.name = params['algorithm'];
      this.showDetail();
    });
  }

  ngOnInit() {
  }

  showDetail() {
    const url = `https://raw.githubusercontent.com/xuzijian629/library/master/${this.group}/${this.name}.cpp`;
    let get = this.http.get(url, { responseType: 'text' });
    get.subscribe(this.showDetailSuccess, this.error);
  }

  showDetailSuccess(response) {
    this.code = this.sanitizer.sanitize(SecurityContext.NONE, response);
  }

  error(error) {
    console.error(error);
  }
}
