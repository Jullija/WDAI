import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketInfoService } from '../basket-info.service';
import { WycieczkiPipe } from '../filtrowanie/wycieczki.pipe';
import { FirebaseServiceService } from '../firebase-service.service';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {

  constructor(private basketInfoService: BasketInfoService, public datepipe: DatePipe, private fb: FirebaseServiceService) { }

  journeys: Wycieczka[] = [];

  reserved:number = 0;
  totalPrice:number = 0;
  reservedList = new Map<Wycieczka, number>();


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
    rates: [],
    status: []
  } as WycieczkaFilter

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

  ngOnInit(): void {
    this.fb.getTravels().subscribe(tmp => {
      this.journeys = [];
      for (let i of tmp){
        let priceChange = i.cenaJednostkowa;
        
        priceChange = this.priceChangeFunction(i.waluta, i.cenaJednostkowa, priceChange)
          
              
        this.journeys.push({
          id: i.id,
          nazwa: i.nazwa,
          docelowyKraj: i.docelowyKraj,
          dataRozpoczecia: i.dataRozpoczecia,
          dataZakonczenia: i.dataZakonczenia,
          cenaJednostkowa: i.cenaJednostkowa,
          waluta: i.waluta,
          cenaWZlotowkach: priceChange,
          maxIloscMiejsc: i.maxIloscMiejsc,
          maxIloscMiejsc2: i.maxIloscMiejsc2,
          opis: i.opis,
          zdjecie: i.zdjecie,
          wyprzedana: i.wyprzedana,
          rating: i.rating,
          sumRating: i.sumRating,
          howManyRatings: i.howManyRatings,
          bought: i.bought
        } as Wycieczka) 
      }
    })

    
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
    this.fb.removeClick(journey);
    this.basketInfoService.removeClick(journey);
  }

  
  addClick(journey: Wycieczka){
    this.fb.addClick(journey);
    this.basketInfoService.addClick(journey);
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
    this.fb.addNewJourney(data);
    this.journeys.push(data);
    this.reservedList.set(data, 0)
  }

  removeJourney(data: Wycieczka){
    this.reserved -= data.maxIloscMiejsc2 - data.maxIloscMiejsc;
    this.totalPrice -= (data.maxIloscMiejsc2 - data.maxIloscMiejsc) * data.cenaWZlotowkach;
    this.fb.removeJourney(data);

  }


  filterGiven(filter: WycieczkaFilter){
    this.filter = filter;
  }


  closestJourneyFunction(){
    let todayDate = this.datepipe.transform(new Date, 'yyyy.MM.dd');
    let closestToToday = '31.12.3000';
    let journeyName = '';

    
    for (let journey of this.journeys){
      if (todayDate !== null){
        let split = journey.dataRozpoczecia.split('.');
        let journeyDateFormatted = split[2] + '.' + split[1] + '.' + split[0];
        if (journeyDateFormatted >= todayDate && journeyDateFormatted < closestToToday){
          closestToToday = journeyDateFormatted;
          journeyName = journey.nazwa;
        }
      }
    }
    return journeyName
  }


}







export class Wycieczka{
  id: number;
  nazwa: string;
  docelowyKraj: string;
  dataRozpoczecia: string;
  dataZakonczenia: string;
  cenaJednostkowa: number;
  waluta: string;
  cenaWZlotowkach:number;
  maxIloscMiejsc: number; //ile zostanie po rezerwacji
  maxIloscMiejsc2: number; //max ilość dostępnych miejsc
  opis:string;
  zdjecie: string;
  wyprzedana:boolean;
  rating: number;
  sumRating: number;
  howManyRatings:number;
  bought: boolean;
}

export class WycieczkaFilter{
  countries: string[];
  minPrice: number;
  maxPrice: number;
  startDate: string;
  endDate: string;
  rates: number[];
  status: boolean[];
}
