import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zad6',
  templateUrl: './zad6.component.html',
  styleUrls: ['./zad6.component.css'],
})
export class Zad6Component implements OnInit {

  constructor() { }
  showBasics = false;
  showEvents = false;
  showComponents = false;



  ngOnInit(): void {
  }

  basicsButton(){
    this.showBasics = true;
    this.showEvents = false;
    this.showComponents = false;
  }

  componentsButton(){
    this.showBasics = false;
    this.showEvents = false;
    this.showComponents = true;
  }

  eventsButton(){
    this.showBasics = false;
    this.showEvents = true;
    this.showComponents = false;
  }




}
