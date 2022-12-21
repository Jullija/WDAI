import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FirebaseServiceService } from '../firebase-service.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';

@Component({
  selector: 'app-menager-view',
  templateUrl: './menager-view.component.html',
  styleUrls: ['./menager-view.component.css']
})
export class MenagerViewComponent implements OnInit{

  journeys: Wycieczka[] = [];

  constructor(public auth: AuthenticationService, private fb: FirebaseServiceService){}


  //przeliczniki cen
  dolar:number = 4.59;
  euro:number = 4.70;
  korona:number = 0.19;
  jen:number = 0.032;


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
}
