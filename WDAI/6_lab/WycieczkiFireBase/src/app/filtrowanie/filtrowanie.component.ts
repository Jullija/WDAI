import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Wycieczka, WycieczkaFilter } from '../wycieczki/wycieczki.component';
import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-filtrowanie',
  templateUrl: './filtrowanie.component.html',
  styleUrls: ['./filtrowanie.component.css']
})
export class FiltrowanieComponent implements OnInit {

  @Input() journeys: Wycieczka[];
  @Output() filterEmit = new EventEmitter();

  countries: string[]=[];
  minPrice: number = 0;
  maxPrice: number = 1000000;
  startDate = '';
  endDate = '';
  rates: number[] = [];
  selectedCountries: string[]=[];
  status: boolean[] = [];

  ngOnInit(): void {
  }

  countriesFilt(){
    for (let i of this.journeys){
      if (!this.countries.includes(i.docelowyKraj)){
        this.countries.push(i.docelowyKraj);
      }
    }
  }

  getMinPrice(journeys: Wycieczka[]){
    let minPrice = 1000000;
    for (let journey of journeys){
      if (journey.cenaWZlotowkach < minPrice){
        minPrice = journey.cenaWZlotowkach;
      }
    }
    return minPrice;
  }

  getMaxPrice(journeys: Wycieczka[]){
    let maxPrice = 0;
    for (let journey of journeys){
      if (journey.cenaWZlotowkach > maxPrice){
        maxPrice = journey.cenaWZlotowkach;
      }
    }
    return maxPrice;
  }


  filterChange(){
    let filter = {
      countries: this.selectedCountries,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      startDate: this.startDate,
      endDate: this.endDate,
      rates: this.rates,
      status: this.status
    }

    this.filterEmit.emit(filter);
  }




}
