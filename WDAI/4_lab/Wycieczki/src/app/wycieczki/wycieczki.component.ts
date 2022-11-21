import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {

  constructor() { }

  json:any;
  journeys: Wycieczka[] = [];
  reserved:number = 0;
  dolar:number = 4.59;
  euro:number = 4.70;
  korona:number = 0.19;
  jen:number = 0.032;



  ngOnInit(): void {
    fetch(`./assets/wycieczkiJson.json`)
    .then(res => res.json())
    .then(res => {
      this.json = res;

      for (let i of this.json.wycieczki){
        let priceChange = i.cenaJednostkowa;

        if (i.waluta != "zł"){
          if (i.waluta == "euro"){
            priceChange = i.cenaJednostkowa * this.euro;
          }
          else if (i.waluta == "$"){
            priceChange = i.cenaJednostkowa * this.dolar;
          }
          else if (i.waluta == "jen"){
            priceChange = i.cenaJednostkowa * this.jen;
          }
          else{
            priceChange = i.cenaJednostkowa * this.korona;
          }
          
        }
        
        this.journeys.push({
          nazwa: i.nazwa,
          docelowyKraj: i.docelowyKraj,
          dataRozpoczecia: i.dataRozpoczecia,
          dataZakonczenia: i.dataZakonczenia,
          cenaJednostkowa: i.cenaJednostkowa,
          waluta: i.waluta,
          cenaWZlotowkach: priceChange,
          maxIloscMiejsc: i.maxIloscMiejsc,
          maxIloscMiejsc2: i.maxIloscMiejsc,
          opis: i.opis,
          zdjecie: i.zdjecie,
          wyprzedana: false
        } as Wycieczka)   
        
      }
  })

}
  
addClick(data: Wycieczka){
  if (data.maxIloscMiejsc - 1 >= 0){
    this.reserved += 1;
    data.maxIloscMiejsc -= 1;
  }

  if (data.maxIloscMiejsc == 0){
    data.wyprzedana = true;
  }
}

removeClick(data: Wycieczka){
  if (data.maxIloscMiejsc + 1 <= data.maxIloscMiejsc2){
    this.reserved -= 1;
    data.maxIloscMiejsc += 1;
  }

  if (data.maxIloscMiejsc == 1){
    data.wyprzedana = false;
  }

}


howManyReservations(data: number){
  return this.reserved;
}


mostExpensiveJourney(data: Wycieczka[]) : number{
  let maxi = 0;
  for (let wycieczka of data){
    if (wycieczka.cenaWZlotowkach > maxi &&  wycieczka.wyprzedana == false){
      maxi = wycieczka.cenaWZlotowkach;
    }
  }
  console.log(maxi)
  return maxi;
}

theCheapestJourney(data: Wycieczka[]) : number{
  let mini = 10**9;
  for (let wycieczka of data){
    if (wycieczka.cenaWZlotowkach < mini &&  wycieczka.wyprzedana == false){
      mini = wycieczka.cenaWZlotowkach;
    }
  }
  return mini;

}


removeJourney(data: Wycieczka){
  const index = this.journeys.indexOf(data);
  this.journeys.splice(index, 1);
}


}







export class Wycieczka{
  nazwa: string;
  docelowyKraj: string;
  dataRozpoczecia: string;
  dataZakonczenia: string;
  cenaJednostkowa: number;
  waluta: string;
  cenaWZlotowkach:number;
  maxIloscMiejsc: number;
  maxIloscMiejsc2: number;
  opis:string;
  zdjecie: string;
  wyprzedana:boolean;
}

