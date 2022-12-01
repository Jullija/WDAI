import { Pipe, PipeTransform } from '@angular/core'
import { Wycieczka, WycieczkaFilter } from '../wycieczki/wycieczki.component'
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'filterJourneys',
    pure: false
    
})


export class WycieczkiPipe implements PipeTransform {


    changeDateFormat(dateToConvert: string) { //mam w formacie 
        let date = dateToConvert.split('.');
        return new Date(date[1] + '/' + date[0] + '/' + date[2]);
    }

    transform(journeys: Wycieczka[], filter: WycieczkaFilter) {
    if (!journeys || !filter) {
        return journeys
    }


    return journeys.filter(journey => {
        return ((filter.countries.length == 0) || filter.countries.includes(journey.docelowyKraj) && //kraje
        (journey.cenaWZlotowkach >= filter.minPrice && journey.cenaWZlotowkach <= filter.maxPrice)&& //cena
        (filter.startDate == null || filter.startDate == '' || (this.changeDateFormat(journey.dataRozpoczecia) >= new Date(filter.startDate))) && //data
        (filter.endDate == null || filter.endDate == '' || (this.changeDateFormat(journey.dataZakonczenia) <= new Date(filter.endDate))) &&
        (filter.rates.length == 0 || filter.rates.includes(0) || filter.rates.includes(journey.rating))
        
        )
    })
    
    }
    
    }



   











