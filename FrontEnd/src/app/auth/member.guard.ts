import { CrudService } from './../services/crud-service.service';
// import { SchedularService } from './../services/schedular.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
@Injectable()
export class MemberGuard implements CanActivate {

    constructor(private authService:CrudService,private router:Router){}
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let isAuth = this.authService.isAuthenticate();
    let isRole = this.authService.getRole(); //this getRole() method in CRUD service ,and it will return the role of current user 
   
        if(isRole=='team_member'){ // as this is team_member Guard so return true if user is team member  
            return true;
        }
        return false;
    
    
  }

}