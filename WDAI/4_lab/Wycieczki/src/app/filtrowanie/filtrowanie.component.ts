import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.component';


@Component({
  selector: 'app-filtrowanie',
  templateUrl: './filtrowanie.component.html',
  styleUrls: ['./filtrowanie.component.css']
})
export class FiltrowanieComponent implements OnInit {

  constructor() { }

  @Input() allJourneysList: Wycieczka[];
  countries = new Set<String>();
  minPrice: number = 0;
  maxPrice:number = 10**9;
  startDate:string = '';
  endDate:string = '';
  rating:number = 0;

  ngOnInit(): void {
  }

  allCountries(){
    for (let i of this.allJourneysList){
      this.countries.add(i.docelowyKraj);
    }
  }







}
