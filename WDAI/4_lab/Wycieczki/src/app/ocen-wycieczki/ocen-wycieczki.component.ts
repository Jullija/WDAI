import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ocen-wycieczki',
  templateUrl: './ocen-wycieczki.component.html',
  styleUrls: ['./ocen-wycieczki.component.css']
})
export class OcenWycieczkiComponent implements OnInit {

  constructor() { }

  @Input() allRates:Map<string, number>;
  @Input() whichJourney:string;

  ngOnInit(): void {
    console.log(this.whichJourney)
  }
  

  isClicked(event:any){
    console.log(this.whichJourney)
    if (event.target.id == "one"){
      let curr1 = this.allRates.get(this.whichJourney);
      let curr2 = this.allRates.get(this.whichJourney);
      
      if (curr1 == 0){
        this.allRates.set(this.whichJourney, 1);
        return;
      }

      if (curr1 !== undefined && curr2 !== undefined){
        curr1 += 1;
        curr1 /= 2;
        curr1 = Math.round(curr1);
        curr1.toFixed(2);
        this.allRates.set(this.whichJourney, curr1);
      }
    }

    else if (event.target.id == "two"){
      let curr1 = this.allRates.get(this.whichJourney);

      if (curr1 == 0){
        this.allRates.set(this.whichJourney, 2);
        return;
      }

      if (curr1 !== undefined){
        curr1 += 2;
        curr1 /= 2;
        curr1 = Math.round(curr1);
        this.allRates.set(this.whichJourney, curr1);
      }
    } 

    else if (event.target.id == "three"){
      let curr1 = this.allRates.get(this.whichJourney);

      if (curr1 == 0){
        this.allRates.set(this.whichJourney, 3);
        return;
      }

      if (curr1 !== undefined){
        curr1 += 3;
        curr1 /= 2;
        curr1 = Math.round(curr1);
        this.allRates.set(this.whichJourney, curr1);
      }
    }

    else if (event.target.id == "four"){
      let curr1 = this.allRates.get(this.whichJourney);

      if (curr1 == 0){
        this.allRates.set(this.whichJourney, 4);
        return;
      }

      if (curr1 !== undefined){
        curr1 += 4;
        curr1 /= 2;
        curr1 = Math.round(curr1);
        this.allRates.set(this.whichJourney, curr1);
      }
    }

    else{
      let curr1 = this.allRates.get(this.whichJourney);

      if (curr1 == 0){
        this.allRates.set(this.whichJourney, 5);
        return;
      }

      if (curr1 !== undefined){
        curr1 += 5;
        curr1 /= 2;
        curr1 = Math.round(curr1);
        this.allRates.set(this.whichJourney, curr1);
      }
    }


}
}
