import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Wycieczka } from './wycieczki/wycieczki.component';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  journeys: Observable<any[]>;
  private nextId: number = 0;

  constructor(private db: AngularFireDatabase) {
    this.journeys = this.db.list("Wycieczki").valueChanges();
  }

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


   getTravels() :Observable<any[]>{
    return this.journeys;
   }

   addNewJourney(journey: any){
    if (journey.cenaWZlotowkach !== undefined){
      journey.cenaWZlotowkach = this.priceChangeFunction(journey.waluta, journey.cenaJednostkowa, journey.cenaJednostkowa);
    }

    this.db.list("Wycieczki").push(journey);
   }

   removeJourney(journey: Wycieczka){
    this.db.list('Wycieczki').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().nazwa==journey.nazwa && i.payload.val().opis == journey.opis && i.payload.val().zdjecie == journey.zdjecie && i.payload.val().dataRozpoczecia == journey.dataRozpoczecia && i.payload.val().dataZakonczenia == journey.dataZakonczenia)
        {
          this.db.list('Wycieczki').remove(i.payload.key);
        }
      }
    } )
   }

   
   
}
