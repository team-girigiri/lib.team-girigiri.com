import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.less']
})
export class AlgorithmComponent implements OnInit {
  @Input('group') group: string;
  @Input('name') name: string;
  @Input('data') data: any;
  public path: string;

  constructor() { }

  ngOnInit() {
    this.path = `${this.group}/${this.name}`;
  }
}
