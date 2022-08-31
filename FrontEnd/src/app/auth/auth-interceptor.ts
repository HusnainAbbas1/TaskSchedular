import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CrudService } from "../services/crud-service.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor{

        intercept(req: HttpRequest<any>, next: HttpHandler) {

            let token = localStorage.getItem('token')  || ""
            if(token) {
                token  = JSON.parse(localStorage.getItem('token') as string);
            }
            const authRequest = req.clone({
                headers:req.headers.set("Authorization",token)
            });
            return next.handle(authRequest);
        }
    
    


}