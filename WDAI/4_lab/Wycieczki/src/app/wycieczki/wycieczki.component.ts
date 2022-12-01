import { Component, OnInit } from '@angular/core';
import { WycieczkiPipe } from '../filtrowanie/wycieczki.pipe';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {

  constructor() { }

  json:any;
  journeys: Wycieczka[] = [];
  reserved:number = 0;
  reservedList = new Map<string, [number, number]>(); //"nazwa wycieczki", [cenaWZlotowkach, ile rezerwacji]
  allRates = new Map<string, number>(); //"nazwa", ocena



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
    fetch(`./assets/wycieczkiJson.json`)
    .then(res => res.json())
    .then(res => {
      this.json = res;

      for (let i of this.json.wycieczki){
        let priceChange = i.cenaJednostkowa;

        if (i.waluta != "zł"){
          if (i.waluta == "euro"){
            priceChange = i.cenaJednostkowa * this.euro;
          }
          else if (i.waluta == "$"){
            priceChange = i.cenaJednostkowa * this.dolar;
          }
          else if (i.waluta == "jen"){
            priceChange = i.cenaJednostkowa * this.jen;
          }
          else{
            priceChange = i.cenaJednostkowa * this.korona;
          }
          
        }
        
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
          howManyRatings: 0
        } as Wycieczka)   

        this.reservedList.set(i.nazwa, [priceChange, 0]);
        this.allRates.set(i.nazwa, 0);
      
      }

  })

}

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


  howManyReservations(data: number){
    return this.reserved;
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



  removeJourney(data: Wycieczka){
    this.reserved -= data.maxIloscMiejsc2 - data.maxIloscMiejsc;
    this.reservedList.delete(data.nazwa);
    const index = this.journeys.indexOf(data);
    this.journeys.splice(index, 1);
    console.log(this.journeys)
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
    this.allRates.set(data.nazwa, 0);
  }


  journeyRated(data: Map<string, number>){
    this.allRates = data;
    for (let i of data){
      for (let j of this.journeys){
        if (i[0] == j.nazwa){
          j.howManyRatings = i[1];
          return
        }
      }
    }
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
