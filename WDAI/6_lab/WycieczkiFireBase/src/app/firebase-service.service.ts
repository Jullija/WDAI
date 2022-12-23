import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { firstValueFrom, Observable } from 'rxjs';
import { first } from 'rxjs';
import { Opinion } from './szczegoly-wycieczki/szczegoly-wycieczki.component';
import { User } from './User';
import { Wycieczka } from './wycieczki/wycieczki.component';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  nextIndex: number = 0;
  journeys: Observable<any[]>;
  opinions: Observable<any[]>;
  history: Observable<any[]>;
  opinionToShow: Opinion[] = [];


  constructor(private db: AngularFireDatabase, public datepipe: DatePipe) {
    this.journeys = this.db.list("Wycieczki").valueChanges();
    this.db.list('Wycieczki', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextIndex = res[0]?.id+1})
    this.opinions = this.db.list("Opinie").valueChanges();
    this.history = this.db.list("Historia").valueChanges();
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

   getOpinions():Observable<any[]>{
    return this.opinions;
   }

   getHistory():Observable<any[]>{
    return this.history;
   }

   setNewNextIndex(i: number){
    this.nextIndex = i;
  }

  getNextIndex(){
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
        if(i.payload.val().id==journey.id)
        
        {
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
          journey.howManyRatings = i.payload.val().howManyRatings + 1;;
          journey.sumRating = i.payload.val().sumRating + Number(event.target.value);
          journey.rating = Math.round(i.payload.val().sumRating / i.payload.val().howManyRatings);
        }
      }
    } )

   }

   changeDate(dateToChange: Date){
    return this.datepipe.transform(dateToChange, 'dd.MM.yyyy');
  }


   moveJourneyToHistory(journey: Wycieczka, howManyToBuy: number, datePaym: Date){
    this.db.list('Wycieczki').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for (let i of items){
        if (i.payload.val().id == journey.id){
          this.db.list('Wycieczki').update(i.payload.key, {maxIloscMiejsc: i.payload.val().maxIloscMiejsc - howManyToBuy});
          this.db.list('Wycieczki').update(i.payload.key, {maxIloscMiejsc2: i.payload.val().maxIloscMiejsc2 - howManyToBuy});
          this.db.list('Wycieczki').update(i.payload.key, {bought: true});
        }
      }
    })


    this.db.list('Historia').snapshotChanges().pipe(first()).subscribe((items:any) => {
      this.db.list("Historia").push({howManyBought: howManyToBuy, whenBought: datePaym.toString(), info: journey});
    })
   }


   setOpinionsForJourney(opinion: Opinion){
    this.db.list('Opinie').push(opinion);
   }


   removeClick(data: Wycieczka){ 

    this.db.list("Wycieczki").snapshotChanges().pipe(first()).subscribe((items:any) => {
      for (let i of items){
        if (i.payload.val().id == data.id){
          if (i.payload.val().maxIloscMiejsc + 1 <= data.maxIloscMiejsc2){
            this.db.list("Wycieczki").update(i.payload.key, {maxIloscMiejsc: i.payload.val().maxIloscMiejsc + 1})            
          }
          if (i.payload.val().maxIloscMiejsc == 1){
            this.db.list("Wycieczki").update(i.payload.key, {wyprzedana: false})
          }

          
        }
      }
    }

  )}

  addClick(data: Wycieczka){ 

    this.db.list("Wycieczki").snapshotChanges().pipe(first()).subscribe((items:any) => {
      for (let i of items){
        if (i.payload.val().id == data.id){
          if (i.payload.val().maxIloscMiejsc - 1 >= 0){
            this.db.list("Wycieczki").update(i.payload.key, {maxIloscMiejsc: i.payload.val().maxIloscMiejsc - 1})            
          }
          if (i.payload.val().maxIloscMiejsc == 0){
            this.db.list("Wycieczki").update(i.payload.key, {wyprzedana: true})
          }

        }
      }
    }

  )}


  addNewUser(user: User){
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles
    });
  }

  async getUserRoles(uid: string){
    return firstValueFrom(this.db.object('/users/' + uid + '/roles').valueChanges());
  }

  changeUserRole(uid: string, newRole: string, value: string){
    let afterChange = '{"' + newRole + '"' + ': ' + value + '}';
    this.db.object('/users/' + uid + '/roles').update(JSON.parse(afterChange));
  }

  getUsers(){
    return this.db.list('users').snapshotChanges();
  }




   
   
}
