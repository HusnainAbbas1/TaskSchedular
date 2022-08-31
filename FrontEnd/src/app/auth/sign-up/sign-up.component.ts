import { CrudService } from './../../services/crud-service.service';
// import { AuthService } from './../../services/auth.service';
// import { SchedularService } from '../../services/schedular.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.dev';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent  implements OnInit ,AfterViewInit
 {
  form:FormGroup;

  constructor(private fb:FormBuilder,private authService:CrudService){
   this.form = fb.group({
     userName:['',[Validators.required,Validators.minLength(5)]],
     password:['',[Validators.required,Validators.minLength(8)]]
   })
   console.log('child');
  }
  
  signUp( ){ 
    const body ={
     name:this.form.value.userName,
     password:this.form.value.password
   }
 
   this.authService.post(environment.createUserURL,body).subscribe((response:any)=>{
   console.log('response ',response);
   }); 
  }
 
  
  public get password() {
   return this.form.get('password');
  }
 
  public get userName(){
   return this.form.get('userName');
  }

  ngOnInit(): void {
    console.log('child');
  }

  ngAfterViewInit(): void {
    console.log('after view')
  }
 
 }
 

