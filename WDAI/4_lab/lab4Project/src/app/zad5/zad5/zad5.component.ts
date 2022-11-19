import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zad5',
  templateUrl: './zad5.component.html',
  styleUrls: ['./zad5.component.css']
})
export class Zad5Component implements OnInit {

  constructor() { }
  showBrands = true;
  showModels = false;
  showColors = false;
  answer = false;

  json:any;

  chosenBrand:string | undefined;
  chosenModel:string | undefined;
  chosenColor:string | undefined;

  brands = new Set<string>();
  models = new Set<string>();
  colors = new Set<string>();

// jeśli wybiorę markę, mogę wybrać model
// jesli wybiorę model, mogę wybrać kolor
// jesli wybiorę kolor, wyświetla mi się wybrany samochód


  ngOnInit(): void {
    fetch(`./assets/carsJson.json`)
      .then(res => res.json())
      .then(res => {
        this.json = res;

        for (let i in this.json.cars){
          this.brands.add(this.json.cars[i].brand)
        }
    })
  }


  //wybrałam markę, mogę wybrać dostępne modele
  brandSelected(){
    for (let i in this.json.cars){
      if (this.json.cars[i].brand == this.chosenBrand){
        this.models.add(this.json.cars[i].model)
      }

    }

    this.showModels = true;
    this.answer = false;
    this.showColors = false;


  }


//wybrałam model, mogę wybrać kolory
  modelSelected(){
    for (let i in this.json.cars){
      if (this.json.cars[i].model == this.chosenModel){
        this.colors.add(this.json.cars[i].color)
      }

    }
    this.showColors = true;
    this.answer = false;


  }


  //wybrałam kolor, mogę wyświetlić
  colorSelected(){
    this.answer = true;
  }

}
