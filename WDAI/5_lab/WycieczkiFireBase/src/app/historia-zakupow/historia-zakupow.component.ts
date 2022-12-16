import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketInfoService } from '../basket-info.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';


export interface historyTrip{
  howManyBought: number,
  whenBought: Date,
  info: Wycieczka
}


@Component({
  selector: 'app-historia-zakupow',
  templateUrl: './historia-zakupow.component.html',
  styleUrls: ['./historia-zakupow.component.css']
})
export class HistoriaZakupowComponent implements OnInit{

  historyTrips: historyTrip[] = [];

  constructor(private basketInfoService: BasketInfoService, public datepipe: DatePipe){}

  ngOnInit(): void {
    this.historyTrips = this.basketInfoService.getTripsFromHistory();
  }


  changeDate(dateToChange: Date){
    return this.datepipe.transform(dateToChange, 'dd.MM.yyyy');
  }
}
