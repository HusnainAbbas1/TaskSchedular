import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../services/crud-service.service';

@Injectable({
  providedIn: 'root',
})

// HttpInterceptor is bulit in angular  interface  that is implemented by our class to attach token with every request
// at the backend we will check if request has token then we will send response to frontend  otherwise send error from backend 
// we implement  intercept method of the interface
// intercept method accept two params (1) is Every HTTP Outgoing request, and  (2) is next method this call for pass to next method in pipeline
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // get stored token from the local storage
    let token = localStorage.getItem('token') || '';
    if (token) {
      token = JSON.parse(localStorage.getItem('token') as string);
    }
    // first we will clone the request and then add token with every requset 
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', token),
    });
    //pass control to the next handler
    return next.handle(authRequest);
  }
}
