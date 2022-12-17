import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.component';
import { BasketInfoService } from '../basket-info.service';
import { FirebaseServiceService } from '../firebase-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {


  constructor(private basketInfoService: BasketInfoService, private db: FirebaseServiceService, public datepipe: DatePipe) { }
  reservedList: Map<Wycieczka, number> = new Map<Wycieczka, number>();
  totalPrice: number = 0;

  ngOnInit(): void {
    this.reservedList = this.basketInfoService.getReservedList();
    this.totalPrice = this.basketInfoService.getTotalPrice();
  }


  buyJourney(journeyToBuy: Wycieczka, howManyToBuy: number){
    let dateOfPayment = new Date;

    //delete from basket, move to history
    this.reservedList.delete(journeyToBuy);
    this.basketInfoService.setReservedList(this.reservedList);
    
    //update totalPrice
    this.totalPrice -= howManyToBuy * journeyToBuy.cenaWZlotowkach;
    this.basketInfoService.setTotalPrice(this.totalPrice);
    //update reservations
    let reservationsBeforeBuying = this.basketInfoService.howManyReservations();
    this.basketInfoService.setHowManyReservations(reservationsBeforeBuying - howManyToBuy);
    //update maxPeople in journey
    this.db.moveJourneyToHistory(journeyToBuy, howManyToBuy, dateOfPayment);



  }


}
