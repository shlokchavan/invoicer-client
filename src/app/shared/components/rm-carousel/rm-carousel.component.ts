import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { trigger, transition, query, style, animate, group } from '@angular/animations';

// Animation Properties
const leftSlide = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const rightSlide = [
  query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
    selector: 'rm-carousel',
    styleUrls: ['rm-carousel.component.scss'],
    templateUrl: 'rm-carousel.component.html',
    animations: [
        trigger('animSlider', [
          transition(':increment', rightSlide),
          transition(':decrement', leftSlide),
        ]),
      ],
})

export class CarouselComponent implements OnInit {

    // Parameters
    @Input() counter: number = 0;
    @Input() dataList: any[]
    @Output() counterChange = new EventEmitter<number>();
    @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor() { }

    ngOnInit() { }

    isPrevDisabled() {
        return this.counter == 0
    }

    isNextDisabled() {
        return this.counter == this.dataList?.length - 1
    }

    onNext() {
        if (this.counter != this.dataList.length - 1) {
          this.counter++;
          this.counterChange.emit(this.counter)
        }
      }
    
      onPrevious() {
        if (this.counter > 0) {
          this.counter--;
          this.counterChange.emit(this.counter)
        }
      }
}