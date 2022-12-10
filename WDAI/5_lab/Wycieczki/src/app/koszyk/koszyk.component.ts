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
  reservedList: Map<string, [number, number]> = new Map<string, [number, number]>();
  totalPrice: number = 0;

  ngOnInit(): void {
    this.reservedList = this.basketInfoService.getReservedList();
    this.totalPrice = this.basketInfoService.getTotalPrice();
  }



}
