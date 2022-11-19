import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Zad5Component } from './zad5/zad5/zad5.component';
import { Zad6Component } from './zad6/zad6.component';


@NgModule({
  declarations: [
    AppComponent,
    Zad5Component,
    Zad6Component,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
