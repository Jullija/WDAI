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

  ngOnInit(): void {
    fetch(`./assets/wycieczkiJson.json`)
    .then(res => res.json())
    .then(res => {
      this.json = res;

      for (let i in this.json.wycieczki){
        this.journeys.push({
          nazwa: this.json.wycieczki[i].nazwa,
          docelowyKraj: this.json.wycieczki[i].docelowyKraj,
          dataRozpoczecia: this.json.wycieczki[i].dataRozpoczecia,
          dataZakonczenia: this.json.wycieczki[i].dataZakonczenia,
          cenaJednostkowa: this.json.wycieczki[i].cenaJednostkowa,
          waluta: this.json.wycieczki[i].waluta,
          maxIloscMiejsc: this.json.wycieczki[i].maxIloscMiejsc,
          maxIloscMiejsc2: this.json.wycieczki[i].maxIloscMiejsc,
          opis: this.json.wycieczki[i].opis,
          zdjecie: this.json.wycieczki[i].zdjecie
        } as Wycieczka)
        
      }
  })

}
  
addClick(data: Wycieczka){
  if (data.maxIloscMiejsc - 1 >= 0){
    this.reserved += 1;
    data.maxIloscMiejsc -= 1;
  }
}

removeClick(data: Wycieczka){
  if (data.maxIloscMiejsc + 1 <= data.maxIloscMiejsc2){
    this.reserved -= 1;
    data.maxIloscMiejsc += 1;
  }
}


howManyReservations(data: number){
  return this.reserved;
}


mostExpensiveJourney(data: Wycieczka[]) : number{
  let maxi = 0;
  for (let wycieczka of data){
    if (wycieczka.cenaJednostkowa > maxi){
      maxi = wycieczka.cenaJednostkowa;
    }
  }
  console.log(maxi);
  return maxi;
}

theCheapestJourney(data: Wycieczka[]) : number{
  let mini = 10**9;
  for (let wycieczka of data){
    if (wycieczka.cenaJednostkowa < mini){
      mini = wycieczka.cenaJednostkowa;
    }
  }
  console.log(mini);
  return mini;

}



}







export class Wycieczka{
  nazwa: string;
  docelowyKraj: string;
  dataRozpoczecia: string;
  dataZakonczenia: string;
  cenaJednostkowa: number;
  waluta: string;
  maxIloscMiejsc: number;
  maxIloscMiejsc2: number;
  opis:string;
  zdjecie: string;
}

