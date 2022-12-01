import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ocen-wycieczki',
  templateUrl: './ocen-wycieczki.component.html',
  styleUrls: ['./ocen-wycieczki.component.css']
})
export class OcenWycieczkiComponent implements OnInit {

  constructor() { }

  @Input() allRates:Map<string, number>;
  @Input() whichJourney:string;
  @Output() ratingSubmitEvent = new EventEmitter();

  ngOnInit(): void {
  }
  

  

  isClicked(event:any){
    console.log(event, this.whichJourney)
    this.allRates.set(this.whichJourney, event)
    console.log(this.allRates)
    this.ratingSubmitEvent.emit(this.allRates);
    // if (event == 1){
    //   let curr1 = this.allRates.get(this.whichJourney);
      
    //   if (curr1 == 0){
    //     this.allRates.set(this.whichJourney, 1);
    //     this.ratingSubmitEvent.emit(this.allRates);
    //     return;
    //   }

    //   if (curr1 !== undefined){
    //     curr1 += 1;
    //     curr1 /= 2;
    //     curr1 = Math.round(curr1);
    //     this.allRates.set(this.whichJourney, curr1);
    //   }
    // }

    // else if (event.target.id == "two"){
    //   let curr1 = this.allRates.get(this.whichJourney);

    //   if (curr1 == 0){
    //     this.allRates.set(this.whichJourney, 2);
    //     this.ratingSubmitEvent.emit(this.allRates);
    //     return;
    //   }

    //   if (curr1 !== undefined){
    //     curr1 += 2;
    //     curr1 /= 2;
    //     curr1 = Math.round(curr1);
    //     this.allRates.set(this.whichJourney, curr1);
    //   }
    // } 

    // else if (event.target.id == "three"){
    //   let curr1 = this.allRates.get(this.whichJourney);

    //   if (curr1 == 0){
    //     this.allRates.set(this.whichJourney, 3);
    //     this.ratingSubmitEvent.emit(this.allRates);
    //     return;
    //   }

    //   if (curr1 !== undefined){
    //     curr1 += 3;
    //     curr1 /= 2;
    //     curr1 = Math.round(curr1);
    //     this.allRates.set(this.whichJourney, curr1);
    //   }
    // }

    // else if (event.target.id == "four"){
    //   let curr1 = this.allRates.get(this.whichJourney);

    //   if (curr1 == 0){
    //     this.allRates.set(this.whichJourney, 4);
    //     this.ratingSubmitEvent.emit(this.allRates);
    //     return;
    //   }

    //   if (curr1 !== undefined){
    //     curr1 += 4;
    //     curr1 /= 2;
    //     curr1 = Math.round(curr1);
    //     this.allRates.set(this.whichJourney, curr1);
    //   }
    // }

    // else{
    //   let curr1 = this.allRates.get(this.whichJourney);

    //   if (curr1 == 0){
    //     this.allRates.set(this.whichJourney, 5);
    //     this.ratingSubmitEvent.emit(this.allRates);
    //     return;
    //   }

    //   if (curr1 !== undefined){
    //     curr1 += 5;
    //     curr1 /= 2;
    //     curr1 = Math.round(curr1);
    //     this.allRates.set(this.whichJourney, curr1);
    //   }
    // }
    // this.ratingSubmitEvent.emit(this.allRates);


}
}
