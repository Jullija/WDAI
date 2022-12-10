import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { KoszykComponent } from './koszyk/koszyk.component';
import { Wycieczka } from './wycieczki/wycieczki.component';

@Injectable({
  providedIn: 'root'
})
export class BasketInfoService {

  flag = true;
  private totalPrice: number = 0;
  private reservedList: Map<string, [number, number]> = new Map<string, [number, number]>;

  json:any;
  journeys: Wycieczka[] = [];
  reserved:number = 0;

  //przeliczniki cen
  dolar:number = 4.59;
  euro:number = 4.70;
  korona:number = 0.19;
  jen:number = 0.032;


  constructor() { }

  priceChangeFunction(currency: string, amount: number, priceChange: number){
    if (currency != "zł"){
      if (currency == "euro"){
        priceChange = amount * this.euro;
      }
      else if (currency == "$"){
        priceChange = amount * this.dolar;
      }
      else if (currency == "jen"){
        priceChange = amount * this.jen;
      }
      else{
        priceChange = amount * this.korona;
      }
    
  }return priceChange;}

  getTravels(){
    if (this.flag){
      fetch(`./assets/wycieczkiJson.json`)
    .then(res => res.json())
    .then(res => {
      this.json = res;

      for (let i of this.json.wycieczki){
        let priceChange = i.cenaJednostkowa;
        priceChange = this.priceChangeFunction(i.waluta, i.cenaJednostkowa, priceChange)
          
              
        this.journeys.push({
          nazwa: i.nazwa,
          docelowyKraj: i.docelowyKraj,
          dataRozpoczecia: i.dataRozpoczecia,
          dataZakonczenia: i.dataZakonczenia,
          cenaJednostkowa: i.cenaJednostkowa,
          waluta: i.waluta,
          cenaWZlotowkach: priceChange,
          maxIloscMiejsc: i.maxIloscMiejsc,
          maxIloscMiejsc2: i.maxIloscMiejsc,
          opis: i.opis,
          zdjecie: i.zdjecie,
          wyprzedana: false,
          rating: 0,
          sumRating: 0,
          howManyRatings: 0
        } as Wycieczka)   

        this.reservedList.set(i.nazwa, [priceChange, 0]);
      
      }

  })
    }
    this.flag = false;
    return this.journeys;
  }



  removeJourney(data: Wycieczka){
    this.reserved -= data.maxIloscMiejsc2 - data.maxIloscMiejsc;
    this.reservedList.delete(data.nazwa);
    const index = this.journeys.indexOf(data);
    this.journeys.splice(index, 1);
  }


  addNewJourney(journey: any){
    if (journey.cenaWZlotowkach !== undefined){
      journey.cenaWZlotowkach = this.priceChangeFunction(journey.waluta, journey.cenaJednostkowa, journey.cenaJednostkowa);
    }
    
    
    this.journeys.push(journey);
    this.reservedList.set(journey.nazwa, [journey.cenaWZlotowkach, 0])
  }


  getTotalPrice(){
    let totalPrice = 0;
    for (let i of this.reservedList.values()){
      if (i[1] != 0){
        totalPrice += i[1] * i[0];
      }
    }
    return totalPrice;

  }

  howManyReservations(){
    console.log(this.reserved);
    return this.reserved;
  }

  removeClick(data: Wycieczka){
    if (data.maxIloscMiejsc + 1 <= data.maxIloscMiejsc2){
      this.reserved -= 1;
      data.maxIloscMiejsc += 1;
      
      let curr = this.reservedList.get(data.nazwa);
      if (curr !== undefined){
        curr[1] -= 1;
      }
      

    if (data.maxIloscMiejsc == 1){
      data.wyprzedana = false;
    }

  }}


  addClick(data: Wycieczka){
    if (data.maxIloscMiejsc - 1 >= 0){
      this.reserved += 1;
      data.maxIloscMiejsc -= 1;

      let curr = this.reservedList.get(data.nazwa);
      if (curr !== undefined){
        curr[1] += 1;
      }

    }

    if (data.maxIloscMiejsc == 0){
      data.wyprzedana = true;
    }
  }

  getReservedList1(reservedList: Map<string, [number, number]>){
    this.reservedList = reservedList;

  }
  getReservedList(){
    return this.reservedList; 
  }


}
