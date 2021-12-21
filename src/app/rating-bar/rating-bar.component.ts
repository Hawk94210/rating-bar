import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, } from '@angular/core';
import { IRatingBar } from '../i-rating-bar';


@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent implements OnInit,OnChanges  {

  @Input() max = 10;
  @Input() ratingValue:any = 5;
  @Input() showRatingValue = true;

  @Output()
  rateChange = new EventEmitter<number>();

  ratingBar: Array<IRatingBar> = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
      if ('max' in changes ) {
        let max = changes['max'].currentValue;
        max = typeof max === 'undefined' ? 5 : max;
        this.max = max;
        this.calculate(max, this.ratingValue);
      }
  }

  calculate(max:any, ratingValue:number){
    this.ratingBar = Array.from({length:max},
      (_,index) => ({
        volume : index +1,
        active: index < ratingValue
      }));
  }

  ngOnInit(): void {
    this.calculate(this.max,this.ratingValue);
  }

  select(index:number ){
    this.ratingValue = index +1;
    this.ratingBar.forEach((item, idx) => item.active = idx < this.ratingValue);
    this.rateChange.emit(this.ratingValue);
  }

  enter(index:any){
    this.ratingBar.forEach((item, idx) => item.active = idx <= index);
  }

  reset(){
    this.ratingBar.forEach((item, idx) => item.active =idx < this.ratingValue);
  }

}
