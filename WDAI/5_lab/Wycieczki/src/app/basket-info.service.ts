import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { KoszykComponent } from './koszyk/koszyk.component';
import { Opinion } from './szczegoly-wycieczki/szczegoly-wycieczki.component';
import { Wycieczka } from './wycieczki/wycieczki.component';

@Injectable({
  providedIn: 'root'
})
export class BasketInfoService {

  flag:boolean = true;
  nextIndex:number = -1;
  opinionNextIndex:number = -1;
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

  opinions: Map<string, Opinion[]> = new Map<string, Opinion[]>();

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
      let index = 0;
      for (let i of this.json.wycieczki){
        
        let priceChange = i.cenaJednostkowa;
        priceChange = this.priceChangeFunction(i.waluta, i.cenaJednostkowa, priceChange)
          
              
        this.journeys.push({
          id: index,
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

        index += 1;
        this.reservedList.set(i.nazwa, [priceChange, 0]);
      }
      
      this.flag = false;

      for (let journey of this.journeys){
        if (journey.id  > this.nextIndex){
          this.nextIndex = journey.id;
        }
      }
      this.nextIndex += 1;

  })
    }
    return this.journeys;
  }




//DODAWANIE I USUWANIE WYCIECZEK----------------------------------

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
//-----------------------------------------------------------------




  getTotalPrice(){
    let totalPrice = 0;
    for (let i of this.reservedList.values()){
      if (i[1] != 0){
        totalPrice += i[1] * i[0];
      }
    }
    return totalPrice;

  }




  //INDEXY WYCIECZEK-----------------------------
  setNewNextIndex(i: number){
    this.nextIndex = i;
  }

  getNextIndex(){
    return this.nextIndex;
  }
//-------------------------------------------------





  howManyReservations(){
    return this.reserved;
  }







  //REZERWACJE WYCIECZEK--------------------------------------
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

//-----------------------------------------------------------








  getReservedList1(reservedList: Map<string, [number, number]>){
    this.reservedList = reservedList;

  }
  getReservedList(){
    return this.reservedList; 
  }

  getJourneyById(id: number){
    let wantedJourney = {
      id: -1,
      nazwa: '',
      docelowyKraj: '',
      dataRozpoczecia: '',
      dataZakonczenia: '',
      cenaJednostkowa: -1,
      waluta: '',
      cenaWZlotowkach:-1,
      maxIloscMiejsc: -1,
      maxIloscMiejsc2: -1,
      opis:'',
      zdjecie: '',
      wyprzedana: false,
      rating: -1,
      sumRating: -1,
      howManyRatings:-1
    } 

    for (let journey of this.journeys){
      if (journey.id == id){
        wantedJourney = journey;
        return wantedJourney;
      }
    }
    return wantedJourney;
  }



  //FORMULARZ DODANIA OPINII-------------------------------------

  getOpinionsForThisJourney(journeyName: string){
    if (!this.opinions.has(journeyName)){
      this.opinions.set(journeyName, [])
    }

    if (this.opinions.get(journeyName) !== undefined){
      return this.opinions.get(journeyName);
    }

    return [];
  }


  setOpinionsForJourney(journeyName: string, journeyOpinions: Opinion[]){
    this.opinions.set(journeyName, journeyOpinions);
  }

  //------------------------------------------------------------

}
