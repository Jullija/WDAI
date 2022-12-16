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
  private nextIndex: number = 0;
  private maxi: number = -1;

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

   setNewNextIndex(i: number){
    this.nextIndex = i;

  }

  getNextIndex(){
    
    this.db.list('Wycieczki').snapshotChanges().subscribe((items:any[]) =>{
      this.nextIndex = 0;
      for(let i of items){
        this.nextIndex += 1;
      }
      if (this.maxi < this.nextIndex){
        this.maxi = this.nextIndex;
      }
      else if (this.nextIndex < this.maxi){
        this.nextIndex = this.maxi;
      }
    } )

    return this.nextIndex;
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
        console.log(i.payload.val().id, journey.id)
        if(i.payload.val().id==journey.id)
        
        {
          console.log(i.payload.val().id, journey.id)
          this.db.list('Wycieczki').remove(i.payload.key);
        }
      }
    } )
   }

   ratingFunction(journey: Wycieczka, event: any){
    this.db.list('Wycieczki').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        
        if(i.payload.val().id==journey.id )
        {
          this.db.list('Wycieczki').update(i.payload.key, {howManyRatings: i.payload.val().howManyRatings + 1});
          this.db.list('Wycieczki').update(i.payload.key, {sumRating: i.payload.val().sumRating + Number(event.target.value)})
          this.db.list('Wycieczki').update(i.payload.key, {rating: Math.round(i.payload.val().sumRating / i.payload.val().howManyRatings)})
        }
      }
    } )

   }


   moveJourneyToHistory(journey: Wycieczka, howManyToBuy: number){
    this.db.list('Wycieczki').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for (let i of items){
        if (i.payload.val().id == journey.id){
          this.db.list('Wycieczki').update(i.payload.key, {maxIloscMiejsc: i.payload.val().maxIloscMiejsc - howManyToBuy});
          this.db.list('Wycieczki').update(i.payload.key, {maxIloscMiejsc2: i.payload.val().maxIloscMiejsc2 - howManyToBuy});
        }
      }
    })
   }


   
   
}
