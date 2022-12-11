import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketInfoService } from '../basket-info.service';
import { Wycieczka } from '../wycieczki/wycieczki.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(private basketInfoService: BasketInfoService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

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
      howManyRatings:-1
  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.journey = this.basketInfoService.getJourneyById(this.id);


    //formularz dodania opinii
    let tmp = this.basketInfoService.getOpinionsForThisJourney(this.journey.nazwa);
    if (tmp !== undefined){
      this.opinions = tmp;
    }
    
    this.modelForm = this.formBuilder.group({
      nick:['', Validators.required],
      name:['', [Validators.required, Validators.pattern("[A-Z]{1}[a-z]*" )]],
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


  onSubmit(data: any){
    if (!data.valid){
      alert("Formularz wypełniony niepoprawnie");
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
