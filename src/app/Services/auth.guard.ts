import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppDataService } from './app-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user:any;
  
  constructor(private appDataService:AppDataService, private router:Router){
    appDataService.getLoginUser().subscribe(_user=>{
      this.user = _user;
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.user) {
        return true;
      }      
      this.router.navigate(['/login']);
      return false;
  }
  
}
