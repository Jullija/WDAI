import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { HomeComponent } from './home/home.component';
import { DodajWycieczkiComponent } from './dodaj-wycieczki/dodaj-wycieczki.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { OcenWycieczkiComponent } from './ocen-wycieczki/ocen-wycieczki.component';


@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    HomeComponent,
    DodajWycieczkiComponent,
    KoszykComponent,
    OcenWycieczkiComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }