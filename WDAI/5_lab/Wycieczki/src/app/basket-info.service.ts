import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { KoszykComponent } from './koszyk/koszyk.component';
import { Wycieczka } from './wycieczki/wycieczki.component';

@Injectable({
  providedIn: 'root'
})
export class BasketInfoService {

  private totalPrice: number = 0;
  private allJourneys: Map<string, [number, number]> = new Map<string, [number, number]>();
  private reservedList: Subject<Map<string, [number, number]>> = new Subject<Map<string, [number, number]>>;

  constructor() { }

  getTotalPrice(){
    let totalPrice = 0;
    for (let i of this.allJourneys.values()){
      if (i[1] != 0){
        totalPrice += i[1] * i[0];
      }
    }
    console.log(totalPrice);
    return totalPrice;

  }
  

  giveTravels(data: any){
    console.log(this.allJourneys)
    this.allJourneys = data;
    this.reservedList.next(this.allJourneys);
  }

  getTravels():Observable<Map<string, [number, number]>>{
    return this.reservedList.asObservable();
  }


}
