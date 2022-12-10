import { Component, OnInit } from '@angular/core';
import { BasketInfoService } from '../basket-info.service';
import { WycieczkiPipe } from '../filtrowanie/wycieczki.pipe';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {

  constructor(private basketInfoService: BasketInfoService) { }

  journeys: Wycieczka[] = [];

  reserved:number = 0;
  totalPrice:number = 0;
  reservedList = new Map<string, [number, number]>(); //"nazwa wycieczki", [cenaWZlotowkach, ile rezerwacji]

  //przeliczniki cen
  dolar:number = 4.59;
  euro:number = 4.70;
  korona:number = 0.19;
  jen:number = 0.032;



  filter = {
    countries: [],
    minPrice: 0,
    maxPrice: 10**9,
    startDate: '',
    endDate: '',
    rates: []
  } as WycieczkaFilter



  ngOnInit(): void {
    this.reservedList = this.basketInfoService.getReservedList();
    this.reserved = this.basketInfoService.howManyReservations();
    this.totalPrice = this.basketInfoService.getTotalPrice();
    this.journeys = this.basketInfoService.getTravels();
    console.log(this.journeys, this.totalPrice);
  }


  mostExpensiveJourney(data: Wycieczka[], filter: WycieczkaFilter){
    let maxi = 0;
    let journeyPipe = new WycieczkiPipe();
    data = journeyPipe.transform(data, filter)
    
    for (let wycieczka of data){
      if (wycieczka.cenaWZlotowkach > maxi &&  wycieczka.wyprzedana == false){
        maxi = wycieczka.cenaWZlotowkach;
      }
    }
    return maxi;
  }

  theCheapestJourney(data: Wycieczka[], filter: WycieczkaFilter){
    let mini = 10**9;
    let journeyPipe = new WycieczkiPipe();
    data = journeyPipe.transform(data, filter)

    for (let wycieczka of data){
      if (wycieczka.cenaWZlotowkach < mini &&  wycieczka.wyprzedana == false){
        mini = wycieczka.cenaWZlotowkach;
      }
    }
    return mini;
  }


  removeClick(journey: Wycieczka){
    this.basketInfoService.removeClick(journey);
  }

  
  addClick(journey: Wycieczka){
    this.basketInfoService.addClick(journey);
  }

  removeJourney(journey: Wycieczka){
    this.basketInfoService.removeJourney(journey);
  }

  howManyReservations(){
    return this.basketInfoService.howManyReservations();
  }

  getTotalPrice(){
    return this.basketInfoService.getTotalPrice();
  }
  

  formularzEvent(data: Wycieczka){

    if (data.waluta != "zł"){
      if (data.waluta == "euro"){
        data.cenaWZlotowkach = data.cenaJednostkowa * this.euro;
      }
      else if (data.waluta == "$"){
        data.cenaWZlotowkach = data.cenaJednostkowa * this.dolar;
      }
      else if (data.waluta == "jen"){
        data.cenaWZlotowkach = data.cenaJednostkowa * this.jen;
      }
      else{
        data.cenaWZlotowkach = data.cenaJednostkowa * this.korona;
      }
      
    }
    this.journeys.push(data);
    this.reservedList.set(data.nazwa, [data.cenaWZlotowkach, 0])
  }


  filterGiven(filter: WycieczkaFilter){
    this.filter = filter;
  }

}







export class Wycieczka{
  nazwa: string;
  docelowyKraj: string;
  dataRozpoczecia: string;
  dataZakonczenia: string;
  cenaJednostkowa: number;
  waluta: string;
  cenaWZlotowkach:number;
  maxIloscMiejsc: number;
  maxIloscMiejsc2: number;
  opis:string;
  zdjecie: string;
  wyprzedana:boolean;
  rating: number;
  sumRating: number;
  howManyRatings:number;
}

export class WycieczkaFilter{
  countries: string[];
  minPrice: number;
  maxPrice: number;
  startDate: string;
  endDate: string;
  rates: number[];
}
