import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.less']
})
export class AlgorithmComponent implements OnInit {
  @Input('group') group: string;
  @Input('name') name: string;
  @Input('data') data: string;
  public path: string;
  public comment: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.path = `${this.group}/${this.name}`;
    this.comment = this.sanitizer.bypassSecurityTrustHtml(marked(this.data));
  }
}
