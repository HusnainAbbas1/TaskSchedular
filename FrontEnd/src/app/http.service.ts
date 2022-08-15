import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http:HttpClient) {

  }
 
  login(url:string,user:any){
   
    return this.http.post(url,user);
  }


  signUp(url:string,user:any){
    return this.http.post(url,user);
  }
}
