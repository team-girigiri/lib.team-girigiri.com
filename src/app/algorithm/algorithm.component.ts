import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.less']
})
export class AlgorithmComponent implements OnInit {
  @Input('name') name: string;

  constructor() { }

  ngOnInit() {
  }

}
