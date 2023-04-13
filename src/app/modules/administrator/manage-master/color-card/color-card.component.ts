import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss']
})
export class ColorCardComponent implements OnInit {
  @Input() cardList!: any[];
  constructor() { }

  ngOnInit(): void {
    
  }

}
