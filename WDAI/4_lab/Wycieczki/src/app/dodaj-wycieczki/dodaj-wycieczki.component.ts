import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dodaj-wycieczki',
  templateUrl: './dodaj-wycieczki.component.html',
  styleUrls: ['./dodaj-wycieczki.component.css']
})

export class DodajWycieczkiComponent implements OnInit {

  modelForm: FormGroup;
  error = false;
  okay = false;

  
  constructor(private formBuilder : FormBuilder) {}

  @Output() formSubmitEvent = new EventEmitter<Wycieczka>();

//formBuilder tworzy nam FormGroup i FormControl za pomocą metody group
//Metoda group() tworzy nam nową instancję FormGroup, a każde pole obiektu, tworzy nową instancję FormControl.

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


  onSubmit(data:any){
    this.error = false;
    this.okay = false;

    if (!data.valid){
      this.error = true;
      return
    }


    let nowaWycieczka ={
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
      wyprzedana: false

    }
    this.formSubmitEvent.emit(nowaWycieczka);
    this.okay = true;
    data.reset();
   
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