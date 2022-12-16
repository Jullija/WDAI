import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FirebaseServiceService } from './firebase-service.service';
import { historyTrip } from './historia-zakupow/historia-zakupow.component';
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
  totalPrice: number = 0;
  reservedList: Map<Wycieczka, number> = new Map<Wycieczka, number>;

  json:any;
  journeys: Wycieczka[] = [];
  reserved:number = 0;

  //przeliczniki cen
  dolar:number = 4.59;
  euro:number = 4.70;
  korona:number = 0.19;
  jen:number = 0.032;

  opinions: Map<string, Opinion[]> = new Map<string, Opinion[]>();
  historyTrips: historyTrip[] = [];

  constructor(private fb: FirebaseServiceService) { }

  

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

  
  

  getTotalPrice(){
    return this.totalPrice;

  }

  setTotalPrice(price: number){
    this.totalPrice = price;
  }




  //INDEXY WYCIECZEK-----------------------------
  // setNewNextIndex(i: number){
  //   this.nextIndex = i;
  // }

  // getNextIndex(){
  //   return this.nextIndex;
  // }
//-------------------------------------------------





  howManyReservations(){
    return this.reserved;
  }

  setHowManyReservations(reservations: number){
    this.reserved = reservations;
  }







  //REZERWACJE WYCIECZEK--------------------------------------
  removeClick(data: Wycieczka){ 
    if (data.maxIloscMiejsc + 1 <= data.maxIloscMiejsc2){
      this.reserved -= 1;
      data.maxIloscMiejsc += 1;
      this.totalPrice -= data.cenaWZlotowkach;
      
      this.reservedList.set(data, data.maxIloscMiejsc2 - data.maxIloscMiejsc)
     

    if (data.maxIloscMiejsc == 1){
      data.wyprzedana = false;
    }
    console.log(this.totalPrice, data)

  }}


  addClick(data: Wycieczka){
    if (data.maxIloscMiejsc - 1 >= 0){
      this.reserved += 1;
      data.maxIloscMiejsc -= 1;
      this.totalPrice += data.cenaWZlotowkach;

      this.reservedList.set(data, data.maxIloscMiejsc2 - data.maxIloscMiejsc)
    }

    if (data.maxIloscMiejsc == 0){
      data.wyprzedana = true;
    }
  }

//-----------------------------------------------------------








  setReservedList(reservedList: Map<Wycieczka, number>){
    this.reservedList = reservedList;

  }
  getReservedList(){
    return this.reservedList; 
  }

  getJourneyById(id: number){
    this.fb.getTravels().subscribe(tmp => {
      this.journeys = [];
      let index = 0;
      for (let i of tmp){
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
          howManyRatings: 0,
          bought: false
        } as Wycieczka) 
        index += 1;
      }
    })

    for (let journey of this.journeys){
      if (journey.id  > this.nextIndex){
        this.nextIndex = journey.id;
      }
    }
    this.nextIndex += 1;
    

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
      howManyRatings:-1,
      bought: false
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


  getTripsFromHistory(){
    return this.historyTrips;
  }

  addTripTtoHistoryTrips(journey: Wycieczka, amount: number, date: Date){
    let todayDate = new Date;

    let journeyToAddToHistory = {
      howManyBought: amount,
      whenBought: todayDate,
      info: journey
    }

    this.historyTrips.push(journeyToAddToHistory);
    journey.bought = true;
  }




}
