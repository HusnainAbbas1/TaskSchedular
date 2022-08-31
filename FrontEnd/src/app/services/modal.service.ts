import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  private displayUserCreateModal = new BehaviorSubject<'open' | 'close'>('close');
  private displayUserUpdateModal = new BehaviorSubject<'open' | 'close'>('close');
  
  private displayTaskCreateModal = new BehaviorSubject<'open' | 'close'>('close');
  private displayTaskUpdateModal = new BehaviorSubject<'open' | 'close'>('close');
  
  

  watchUser(modal:any): Observable<'open' | 'close'> {
    if(modal=='update')
    return this.displayUserUpdateModal.asObservable();
    else
    return this.displayUserCreateModal.asObservable();
  }

  watchTask(modal:any): Observable<'open' | 'close'> {
    if(modal=='update')
    return this.displayTaskUpdateModal.asObservable();
    else
    return this.displayTaskCreateModal.asObservable();
  }
  
  openUser(modal:any) {
     if(modal=='update')
    this.displayUserUpdateModal.next('open');
    else
    this.displayUserCreateModal.next('open');
  }
  
  openTask(modal:any) {
    if(modal=='update')
   this.displayTaskUpdateModal.next('open');
   else
   this.displayTaskCreateModal.next('open');
 }

  closeUser(modal:any) {
    if(modal=='update')
    this.displayUserUpdateModal.next('close');
    else
    this.displayUserCreateModal.next('close');
  }

  closeTask(modal:any) {
    if(modal=='update')
    this.displayTaskUpdateModal.next('close');
    else
    this.displayTaskCreateModal.next('close');
  }
  
}