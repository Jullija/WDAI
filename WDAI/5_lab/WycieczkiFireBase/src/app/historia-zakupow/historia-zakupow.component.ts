import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BasketInfoService } from '../basket-info.service';
import { FirebaseServiceService } from '../firebase-service.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';


export interface historyTrip{
  howManyBought: number,
  whenBought: String,
  info: Wycieczka
}


@Component({
  selector: 'app-historia-zakupow',
  templateUrl: './historia-zakupow.component.html',
  styleUrls: ['./historia-zakupow.component.css']
})
export class HistoriaZakupowComponent implements OnInit{

  historyTrips: historyTrip[] = [];
  hist:any;

  constructor(private basketInfoService: BasketInfoService, public datepipe: DatePipe, private fb: FirebaseServiceService){}

  ngOnInit(): void {
    this.hist = this.fb.getHistory().subscribe((tmp: any[]) => {
      for (let i of tmp){
        this.historyTrips.push({
          info: i.info,
          howManyBought: i.howManyBought,
          whenBought: i.whenBought
        })
      }
    })
  }


  changeDate(dateToChange: Date){
    return this.datepipe.transform(dateToChange, 'dd.MM.yyyy');
  }
}
