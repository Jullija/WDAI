import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.component';
import { BasketInfoService } from '../basket-info.service';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {


  constructor(private basketInfoService: BasketInfoService) { }
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
    this.basketInfoService.addTripTtoHistoryTrips(journeyToBuy, howManyToBuy, dateOfPayment);

    //update totalPrice
    this.totalPrice -= howManyToBuy * journeyToBuy.cenaWZlotowkach;
    this.basketInfoService.setTotalPrice(this.totalPrice);
    //update reservations
    let reservationsBeforeBuying = this.basketInfoService.howManyReservations();
    this.basketInfoService.setHowManyReservations(reservationsBeforeBuying - howManyToBuy);
    //update maxPeople in journey
    journeyToBuy.maxIloscMiejsc2 -= howManyToBuy;


  }


}
