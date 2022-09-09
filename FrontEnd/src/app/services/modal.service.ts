import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // these two variables are used for users modal 
  private displayUserCreateModal = new BehaviorSubject<'open' | 'close'>('close');
  private displayUserUpdateModal = new BehaviorSubject<'open' | 'close'>('close');
  // these two variables are used for tasks modal 
  private displayTaskCreateModal = new BehaviorSubject<'open' | 'close'>('close');
  private displayTaskUpdateModal = new BehaviorSubject<'open' | 'close'>('close');
  
  
  // this func is returning updated value of userModal

  watchUser(modal:any): Observable<'open' | 'close'> {
    if(modal=='update')
    return this.displayUserUpdateModal.asObservable();
    else
    return this.displayUserCreateModal.asObservable();
  }

  // this func change value of subjectBehavior from close to open 
  openUser(modal:any) {
    if(modal=='update')
   this.displayUserUpdateModal.next('open');
   else
   this.displayUserCreateModal.next('open');
 }
  // this func change value of subjectBehavior from open to close 
 closeUser(modal:any) {
  if(modal=='update')
  this.displayUserUpdateModal.next('close');
  else
  this.displayUserCreateModal.next('close');
}


   // this func is returning updated value to taskModal
  watchTask(modal:any): Observable<'open' | 'close'> {
    if(modal=='update')
    return this.displayTaskUpdateModal.asObservable();
    else
    return this.displayTaskCreateModal.asObservable();
  }
 
 // this func change value of subjectBehavior from close to open 
  openTask(modal:any) {
    if(modal=='update')
   this.displayTaskUpdateModal.next('open');
   else
   this.displayTaskCreateModal.next('open');
 }

 
  closeTask(modal:any) {
    if(modal=='update')
    this.displayTaskUpdateModal.next('close');
    else
    this.displayTaskCreateModal.next('close');
  }
  
}