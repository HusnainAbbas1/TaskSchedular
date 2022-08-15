import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CrudService } from "../services/crud-service.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor{
    
    // constructor(private authService:CrudService){}
    // token = this.authService.getToken();

    token  = JSON.parse(localStorage.getItem('token') as string);

intercept(req: HttpRequest<any>, next: HttpHandler) {
 
    const authRequest = req.clone({
        headers:req.headers.set("Authorization",this.token)
    });

    return next.handle(authRequest);
}
}