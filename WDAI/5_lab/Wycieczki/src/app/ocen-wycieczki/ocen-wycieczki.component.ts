import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.component';

@Component({
  selector: 'app-ocen-wycieczki',
  templateUrl: './ocen-wycieczki.component.html',
  styleUrls: ['./ocen-wycieczki.component.css']
})
export class OcenWycieczkiComponent implements OnInit {

  constructor() { }

  @Input() whichJourney: Wycieczka;

  ngOnInit(): void {
  }
  

  

  isClicked(event:any){
    this.whichJourney.howManyRatings += 1;
    this.whichJourney.sumRating += Number(event.target.value);
    this.whichJourney.rating = Math.round(this.whichJourney.sumRating / this.whichJourney.howManyRatings);
}
}
