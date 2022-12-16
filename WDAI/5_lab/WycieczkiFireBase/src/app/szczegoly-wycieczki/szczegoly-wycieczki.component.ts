import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketInfoService } from '../basket-info.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';
import { ControlConfig, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../firebase-service.service';
import { first } from 'rxjs/operators';


export interface Opinion{
  nick: string,
  name: string,
  opinion: string,
  date: Date
}


@Component({
  selector: 'app-szczegoly-wycieczki',
  templateUrl: './szczegoly-wycieczki.component.html',
  styleUrls: ['./szczegoly-wycieczki.component.css']
})




export class SzczegolyWycieczkiComponent implements OnInit{

  constructor(private basketInfoService: BasketInfoService, private route: ActivatedRoute, private formBuilder: FormBuilder, private fb: FirebaseServiceService) { }

  modelForm: FormGroup;
  opinions: Opinion[] = [];

  id: number = -1;
  journey = {
      id: -1,
      nazwa: '',
      docelowyKraj: '',
      dataRozpoczecia: '',
      dataZakonczenia: '',
      cenaJednostkowa: -1,
      waluta: '',
      cenaWZlotowkach:-1,
      maxIloscMiejsc: -1,
      maxIloscMiejsc2: -1,
      opis:'',
      zdjecie: '',
      wyprzedana: false,
      rating: -1,
      sumRating: -1,
      howManyRatings:-1,
      bought: false
  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    })

    this.journey = this.basketInfoService.getJourneyById(this.id);
    console.log(this.journey)


    //formularz dodania opinii
    let tmp = this.basketInfoService.getOpinionsForThisJourney(this.journey.nazwa);
    if (tmp !== undefined){
      this.opinions = tmp;
    }
    
    this.modelForm = this.formBuilder.group({
      nick:['', Validators.required],
      name:['', [Validators.required, Validators.pattern(this.journey.nazwa)]],
      opinion:['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date:[''],

    })


  }

  removeClick(journey: Wycieczka){
    this.basketInfoService.removeClick(journey);
  }

  addClick(journey: Wycieczka){
    this.basketInfoService.addClick(journey);
  }





  //FORMULARZ DODANIA OPINII--------------------------------------------------------
  formErrors = {
    nick: '',
    name: '',
    opinion: ''
  }

  private validationMessages = {
    nick:{
      required: 'Podanie nicku jest konieczne'
    },
    name:{
      required: 'Podanie nazwy wycieczki jest konieczne',
      pattern: 'Niepoprawna nazwa wycieczki - możesz oceniać tylko wycieczkę, której szczegóły widzisz'
    },
    opinion:{
      required: 'Napisanie opinii jest konieczne',
      minlength: 'Opinia musi mieć co najmniej 50 znaków',
      maxlength: 'Opinia może mieć maksymalnie 500 znaków'
    }
  }

  onControlValueChange(){
    const form = this.modelForm;

    for (let field in this.formErrors){
      if (field == 'nick' || field == 'name' || field == 'opinion'){
        this.formErrors[field] = '';
        let control = form.get(field); //wpisana zawartość

        if (control && !control.valid){//control.dirty -> dirty, jeśli użytkownik zmienił wartość w UI
          const validationMessages = this.validationMessages[field];
          for (const key in control.errors){
            this.formErrors[field] += validationMessages[key as keyof typeof validationMessages]  + '';
            
          }
          alert(this.formErrors[field]) 
        } 
      }


      
    }
    
  }


  onSubmit(data: any){
    if (!data.valid){
      this.onControlValueChange();
      return
    }

    let newOpinion = {
      nick: data.get("nick").value,
      name: data.get("name").value,
      opinion: data.get("opinion").value,
      date: data.get("date").value
    } as Opinion

    this.opinions.push(newOpinion);
    this.basketInfoService.setOpinionsForJourney(newOpinion.name, this.opinions)
    
    alert("Opinia została dodana");
    data.reset();
  }
}
