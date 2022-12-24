import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { BasketInfoService } from '../basket-info.service';
import { FirebaseServiceService } from '../firebase-service.service';
import { Opinion } from '../szczegoly-wycieczki/szczegoly-wycieczki.component';
import { Wycieczka } from '../wycieczki/wycieczki.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-modyfikacja',
  templateUrl: './modyfikacja.component.html',
  styleUrls: ['./modyfikacja.component.css']
})
export class ModyfikacjaComponent implements OnInit{

  constructor(private formBuilder : FormBuilder, private fb: FirebaseServiceService, private auth: AuthenticationService, private basketInfoService: BasketInfoService, private route: ActivatedRoute){}

  journeys: Wycieczka[] = [];

  modelForm: FormGroup;
  opinions: Opinion[] = [];

  idx: number = -1;
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



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idx = params['id'];
    })

    this.journey = this.basketInfoService.getJourneyById(this.idx);

    this.fb.getTravels().subscribe(tmp => {
      for(let i of tmp){
        if (i.id == this.idx){
          this.journey = i;
        }
      }
    })

    this.modelForm = this.formBuilder.group({
      nazwa: ['', Validators.required],
      docelowyKraj: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[A-Z]{1}[a-z]+')]],
      dataRozpoczecia: ['', [Validators.required, Validators.pattern('([0-9]{1}[0-9]{1}[.]){2}[0-9]{4}')]],
      dataZakonczenia: ['', [Validators.required, Validators.pattern('([0-9]{1}[0-9]{1}[.]){2}[0-9]{4}')]], 
      cenaJednostkowa:['', [Validators.required, Validators.pattern('[0-9]+')]],
      waluta: ['', Validators.required],
      maxIloscMiejsc: ['', [Validators.required,  Validators.pattern('[0-9]+')]],
      opis: ['', Validators.required],
      zdjecie: ['', Validators.required]
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
  

  formErrors = {
    nazwa: '',
    docelowyKraj: '',
    dataRozpoczecia: '',
    dataZakonczenia: '',
    cenaJednostkowa: '',
    waluta: '',
    maxIloscMiejsc: '',
    opis: '',
    zdjecie: ''
  }

  private validationMessages = {
    nazwa:{
      required: 'Podanie nazwy jest konieczne'
    },
    docelowyKraj:{
      required: 'Podanie kraju jest konieczne',
      minlength: 'Minimalna długość nazwy kraju to 4',
      pattern: 'Niepoprawny kraj wycieczki'
    },
    dataRozpoczecia:{
      required: 'Podanie daty rozpoczęcia jest konieczne',
      pattern: 'Format daty to DD.MM.YYYY'
    },
    dataZakonczenia:{
      required: 'Podanie daty zakończenia jest konieczne',
      pattern: 'Format daty to DD.MM.YYYY'
    },
    cenaJednostkowa:{
      required: 'Podanie ceny jest konieczne',
      pattern: 'Cena to liczba'
    },
    waluta:{
      required: 'Podanie waluty jest konieczne'
    },
    maxIloscMiejsc:{
      required: 'Podanie maksymalnej liczby miejsc jest konieczne',
      pattern: 'Maksymalna liczba miejsc jest liczbą'
    },
    opis:{
      required: 'Opis jest konieczny'
    },
    zdjecie:{
      required: 'Zdjęcie jest konieczne'
    }
  }

  onControlValueChange(){
    const form = this.modelForm;

    for (let field in this.formErrors){
      if (field == 'nazwa' || field == 'docelowyKraj' || field == 'dataRozpoczecia' || field == "dataZakonczenia" || field == "cenaJednostkowa" || field == "waluta" || field == "maxIloscMiejsc" || field == "opis" || field == "zdjecie"){
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




  onSubmit(data:any){


    if (!data.valid || !this.checkValidation(data.get("dataRozpoczecia").value, data.get("dataZakonczenia").value) ){
      this.onControlValueChange();
      return
    }

    // this.fb.getTravels().pipe(first()).subscribe((items:any)=>{
    //   for (let i of items){
    //     if (i.id == this.idx){
    //       this
    //     }
    //   }
    // })


    let nowaWycieczka ={
      id: this.idx,
      nazwa: data.get("nazwa").value,
      docelowyKraj: data.get("docelowyKraj").value,
      dataRozpoczecia: data.get("dataRozpoczecia").value,
      dataZakonczenia: data.get("dataZakonczenia").value,
      cenaJednostkowa: data.get("cenaJednostkowa").value,
      waluta: data.get("waluta").value,
      maxIloscMiejsc: data.get("maxIloscMiejsc").value,
      opis: data.get("opis").value,
      zdjecie: data.get("zdjecie").value,
      cenaWZlotowkach: data.get("cenaJednostkowa").value,
      maxIloscMiejsc2: data.get("maxIloscMiejsc").value,
      wyprzedana: false,
      rating: 0,
      sumRating: 0,
      howManyRatings: 0,
      bought: false

    }
    console.log(nowaWycieczka)
    this.fb.updateJourneyDetails(nowaWycieczka, this.idx);
  }
    

}
