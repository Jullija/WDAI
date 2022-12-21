import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { FirebaseServiceService } from '../firebase-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthenticationService, private router: Router, private fb: FirebaseServiceService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.getAuthenticated().pipe(map((state) => {
        
        //sprawdzam, czy użytkownik jest zalogowany ->  w serwisie zadeklarowałam, że null = niezalogowany
        if (state == null){
          this.router.navigate(['']);
          return false;
        }

        this.auth.userData = state;
        return true;
      }))
    }
}