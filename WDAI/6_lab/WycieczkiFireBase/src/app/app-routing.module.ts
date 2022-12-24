import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { DodajWycieczkiComponent } from './dodaj-wycieczki/dodaj-wycieczki.component';
import { AdminGuardGuard } from './guard/admin-guard.guard';
import { AuthGuard } from './guard/auth.guard';
import { MenagerGuardGuard } from './guard/menager-guard.guard';
import { SzczegolyGuardGuard } from './guard/szczegoly-guard.guard';
import { HistoriaZakupowComponent } from './historia-zakupow/historia-zakupow.component';
import { HomeComponent } from './home/home.component';
import { KoszykComponent } from './koszyk/koszyk.component';
import { LoginComponent } from './login/login.component';
import { MenagerViewComponent } from './menager-view/menager-view.component';
import { ModyfikacjaComponent } from './modyfikacja/modyfikacja.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { SzczegolyWycieczkiComponent } from './szczegoly-wycieczki/szczegoly-wycieczki.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';

const routes: Routes = [
  {path: 'wycieczki', component: WycieczkiComponent},
  {path: 'szczegolyWycieczki/:id', component: SzczegolyWycieczkiComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent},
  {path: 'dodajWycieczki', component: DodajWycieczkiComponent, canActivate: [AuthGuard]},
  {path: 'koszyk', component: KoszykComponent, canActivate: [AuthGuard]},
  { path: 'historia', component: HistoriaZakupowComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'adminView', component: AdminViewComponent, canActivate:[AdminGuardGuard]},
  {path: 'menagerView', component: MenagerViewComponent, canActivate:[MenagerGuardGuard]},
  {path: 'modify/:id', component: ModyfikacjaComponent, canActivate:[MenagerGuardGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
