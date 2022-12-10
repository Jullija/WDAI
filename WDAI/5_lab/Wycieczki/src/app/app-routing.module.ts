import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodajWycieczkiComponent } from './dodaj-wycieczki/dodaj-wycieczki.component';
import { HomeComponent } from './home/home.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';

const routes: Routes = [
  {path: 'wycieczki', component: WycieczkiComponent},
  {path: '', component: HomeComponent},
  {path: 'dodajWycieczki', component: DodajWycieczkiComponent},
  {path: 'koszyk', component: KoszykComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
