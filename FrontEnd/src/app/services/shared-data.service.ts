import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedDataService {
  private messageSource = new BehaviorSubject({});
  getUpdateBody = this.messageSource.asObservable();
 
  

  constructor() { }

  setUpdateBody(body: object) {
    this.messageSource.next(body)
  }
  
}
