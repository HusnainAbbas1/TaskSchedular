import { CrudService } from './../services/crud-service.service';
// import { SchedularService } from './../services/schedular.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()

// this is auth guard implement it here and the add it in modules.ts
export class AuthGuard implements CanActivate {
  constructor(private authService: CrudService, private router: Router) {}
  //implement canActivate interface 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isAuth = this.authService.isAuthenticate(); // call isAuthenticate() it will return true  if user is currently authenticted else false
    
    if (!isAuth) {   // if not aaauthenticated naviagate to login page 
      this.router.navigate(['/']);
    }
    //  else {
    //     this.router.navigate(['/home'])
    // }
    return isAuth;  // if authenticated return true .....isAuth contains the true/false; 
  }
}
