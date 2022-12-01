import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { HomeComponent } from './home/home.component';
import { DodajWycieczkiComponent } from './dodaj-wycieczki/dodaj-wycieczki.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { OcenWycieczkiComponent } from './ocen-wycieczki/ocen-wycieczki.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltrowanieComponent } from './filtrowanie/filtrowanie.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { WycieczkiPipe } from './filtrowanie/wycieczki.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    HomeComponent,
    DodajWycieczkiComponent,
    KoszykComponent,
    OcenWycieczkiComponent,
    FiltrowanieComponent, 
    WycieczkiPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule, 
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
