import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Wycieczka } from '../wycieczki/wycieczki.component';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {

  showBasketBool = false;

  constructor() { }
  @Input() reservedList:Map<string, [number, number]>;

  ngOnInit(): void {
  }

  showBasket(){
    this.showBasketBool = !this.showBasketBool;
  }

  getCartSum(){
    let sum = 0;
    for (let i of this.reservedList.values()){
      if (i[1] != 0){
        sum += i[1] * i[0];
      }
    }
    return sum;
  }

  exitClick(){
    this.showBasketBool = false;
  }

}
