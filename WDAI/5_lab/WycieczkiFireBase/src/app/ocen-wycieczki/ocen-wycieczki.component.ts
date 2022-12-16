import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseServiceService } from '../firebase-service.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';

@Component({
  selector: 'app-ocen-wycieczki',
  templateUrl: './ocen-wycieczki.component.html',
  styleUrls: ['./ocen-wycieczki.component.css']
})
export class OcenWycieczkiComponent implements OnInit {

  constructor(private fb: FirebaseServiceService) { }

  @Input() whichJourney: Wycieczka;

  ngOnInit(): void {
  }
  

  

  isClicked(event:any){
    this.fb.ratingFunction(this.whichJourney, event);
    console.log(this.whichJourney);
  }
}
