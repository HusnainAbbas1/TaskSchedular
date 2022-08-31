import { CrudService } from './../services/crud-service.service';
// import { SchedularService } from './../services/schedular.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService:CrudService,private router:Router){}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isAuth = this.authService.isAuthenticate();
    if(!isAuth){
        this.router.navigate(['/'])
    }
    //  else {
    //     this.router.navigate(['/home'])
    // }
    return isAuth;
    
    
  }

}