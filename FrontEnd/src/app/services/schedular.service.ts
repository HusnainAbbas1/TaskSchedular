import { HttpClient } from '@angular/common/http';
import { CrudService } from './crud-service.service';
import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})

export class SchedularService extends CrudService{ 

  constructor(http:HttpClient){
    super('http://localhost:9002/api/v1',http);
   }  
}
