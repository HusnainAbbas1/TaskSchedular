import { HttpService } from '../../http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchedularService } from '../../services/schedular.service';
import { environment } from 'src/environments/environment.dev';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
 form:FormGroup;

 constructor(private fb:FormBuilder,private service:SchedularService,private router:Router,){
  this.form = fb.group({
    userName:['',[Validators.required,Validators.minLength(5)]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })
 }
 
 login( ){
   const body ={
    userName:this.form.value.userName,
    password:this.form.value.password
  }
 
  this.service.post(environment.loginURL, body).subscribe((response :any)=>{
    if(response.token){
      localStorage.setItem('token',JSON.stringify(response.token));
      this.router.navigate(['/home']); }          
  });
 }

 public get password() {
  return this.form.get('password');
 }

 public get userName(){
  return this.form.get('userName');
 }
 
}
