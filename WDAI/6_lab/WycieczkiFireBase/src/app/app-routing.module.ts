import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodajWycieczkiComponent } from './dodaj-wycieczki/dodaj-wycieczki.component';
import { HistoriaZakupowComponent } from './historia-zakupow/historia-zakupow.component';
import { HomeComponent } from './home/home.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SzczegolyWycieczkiComponent } from './szczegoly-wycieczki/szczegoly-wycieczki.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';

const routes: Routes = [
  {path: 'wycieczki', component: WycieczkiComponent},
  {path: 'szczegolyWycieczki/:id', component: SzczegolyWycieczkiComponent},
  {path: '', component: HomeComponent},
  {path: 'dodajWycieczki', component: DodajWycieczkiComponent},
  {path: 'koszyk', component: KoszykComponent},
  { path: 'historia', component: HistoriaZakupowComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
