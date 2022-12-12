import { Component, OnInit } from '@angular/core';
import { BasketInfoService } from '../basket-info.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';


export interface historyTrip{
  howManyBought: number,
  whenBought: Date,
  info: Wycieczka
  // tripName: string,
  // startDate: string,
  // endDate: string,
  // localisation: string,
  // price: number
}


@Component({
  selector: 'app-historia-zakupow',
  templateUrl: './historia-zakupow.component.html',
  styleUrls: ['./historia-zakupow.component.css']
})
export class HistoriaZakupowComponent implements OnInit{

  historyTrips: historyTrip[] = [];

  constructor(private basketInfoService: BasketInfoService){}

  ngOnInit(): void {
    this.historyTrips = this.basketInfoService.getTripsFromHistory();
  }

}
