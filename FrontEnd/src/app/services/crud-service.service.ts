import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CrudService {
  
  constructor( private http: HttpClient) {}

  get(path: string) {
    console.log('from today get  service');
    return this.http.get(path);
  }
   
  post(url: string, body: any) {
    console.log('from http',url,body);
     
    try {
      return this.http.post(url, body);
    } catch (e: any) {
      console.log('e');
      return e;
     }
  }
  
  put(url:string,body:any) {
    console.log(url+'/'+body.id);
    return this.http.put(url+'/'+body.id,body);
  }
  
  delete(url:string,body:any) {
  
  //  return this.http.delete(url, {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  //   body: { foo: body }
  // }
  //   );
  const id = body.id;
  return this.http.delete(url+'/'+id);
  }
  
  isAuthenticate(){
     let token:string = localStorage.getItem('token') as string;
     return (token)?true:false;
  }
  
  getRole(){
  //  let tokenPayLoad =  this.jwtHelper.decodeToken(localStorage.getItem('token') as string);
  //  console.log(tokenPayLoad);
  return 'manager';
}
  
  // ngOnInit(): void {
  //   let tokenPayLoad =  this.jwtHelper.decodeToken(localStorage.getItem('token') as string);
  //  console.log(tokenPayLoad);
  // }  
 
}
