import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'color-card-item',
  templateUrl: './color-card-item.component.html',
  styleUrls: ['./color-card-item.component.scss']
})
export class ColorCardItemComponent implements OnInit {
  @Input() config: any;
  constructor() { }

  ngOnInit(): void {
    this.config['themeName'] = this.config['theme-name'];
    this.config['themeBaseColor'] = this.config['theme-base-color'];


    // String Splice
    const lastIndexOfNum = String(this.config['themeName']).indexOf('(') + 1;
    this.config['themeName'] = String(this.config['themeName']).slice(lastIndexOfNum, -1);
  }

}
