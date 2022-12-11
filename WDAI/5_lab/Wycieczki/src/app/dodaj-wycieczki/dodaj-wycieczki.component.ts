import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasketInfoService } from '../basket-info.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';

@Component({
  selector: 'app-dodaj-wycieczki',
  templateUrl: './dodaj-wycieczki.component.html',
  styleUrls: ['./dodaj-wycieczki.component.css']
})

export class DodajWycieczkiComponent implements OnInit {

  modelForm: FormGroup;
  error = false;
  okay = false;

  
  constructor(private formBuilder : FormBuilder, private basketInfoService: BasketInfoService) {}

  @Output() formSubmitEvent = new EventEmitter<Wycieczka>();


  ngOnInit(): void { 
    this.modelForm = this.formBuilder.group({
      nazwa2: ['', Validators.required],
      docelowyKraj2: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[A-Z]{1}[a-z]+')]],
      dataRozpoczecia2: ['', [Validators.required, Validators.pattern('([0-9]{1}[0-9]{1}[.]){2}[0-9]{4}')]],
      dataZakonczenia2: ['', [Validators.required, Validators.pattern('([0-9]{1}[0-9]{1}[.]){2}[0-9]{4}')]], 
      cenaJednostkowa2:['', [Validators.required, Validators.pattern('[0-9]+')]],
      waluta2: ['', Validators.required],
      maxIloscMiejsc2: ['', [Validators.required,  Validators.pattern('[0-9]+')]],
      opis2: ['', Validators.required],
      zdjecie2: ['', Validators.required]
    });
  }

  checkValidation(data1:string, data2:string){
    let data1Split = data1.split('.'); //start
    let data2Split = data2.split('.'); //end

    if (data2Split[2] > data1Split[2]){
      return true;
    }
    else if (data2Split[2] == data1Split[2]){ 

      if (data2Split[1] > data1Split[1] && data1Split[1] <= '12' && data2Split[1] <= '12'){
        return true;
      }
      else if (data2Split[1] == data1Split[1] && data1Split[1] <= '12'){
        return (data2Split[0] >= data1Split[0] && data2Split[0] <= '31' && data1Split[0] <= '31');
      }
      else{
        return false
      }
      }
    else{
      return false;
    }


  }


  onSubmit(data:any){
    this.error = false;
    this.okay = false;

    if (!data.valid || !this.checkValidation(data.get("dataRozpoczecia2").value, data.get("dataZakonczenia2").value) ){
      this.error = true;
      return
    }


    let nowaWycieczka ={
      id: this.basketInfoService.getNextIndex(),
      nazwa: data.get("nazwa2").value,
      docelowyKraj: data.get("docelowyKraj2").value,
      dataRozpoczecia: data.get("dataRozpoczecia2").value,
      dataZakonczenia: data.get("dataZakonczenia2").value,
      cenaJednostkowa: data.get("cenaJednostkowa2").value,
      waluta: data.get("waluta2").value,
      maxIloscMiejsc: data.get("maxIloscMiejsc2").value,
      opis: data.get("opis2").value,
      zdjecie: data.get("zdjecie2").value,
      cenaWZlotowkach: data.get("cenaJednostkowa2").value,
      maxIloscMiejsc2: data.get("maxIloscMiejsc2").value,
      wyprzedana: false,
      rating: 0,
      sumRating: 0,
      howManyRatings: 0

    }
    this.basketInfoService.setNewNextIndex(nowaWycieczka.id + 1);
    this.basketInfoService.addNewJourney(nowaWycieczka);
    this.okay = true;
    data.reset();
   
  }

}







