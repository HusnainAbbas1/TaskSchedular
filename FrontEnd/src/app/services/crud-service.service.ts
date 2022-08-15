import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CrudService {
  
  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  get(path: string) {
    return this.http.get(path);
  }
   
  post(url: string, body: object) {
    try {
      return this.http.post(url, body);
    } catch (e: any) {
      return e.message;
    }
  }
  
  put(url:string,body:any) {
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
  const id = body.taskId;
  return this.http.delete(url+'/'+id);
  }
  
  getToken(){
    console.log('from crud servixec')
    let token:string = localStorage.getItem('token') as string;
    console.log(token);    
    return JSON.parse(token);
  }
}
