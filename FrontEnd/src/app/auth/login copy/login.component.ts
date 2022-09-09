import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud-service.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponentBootstrap implements OnInit {
  
  form: FormGroup;  // this variable contains the complete object of form  


  constructor(
    private fb: FormBuilder,           // Form Builder is angular built in module for creating Reactive forms    
    private authService: CrudService,  // This is Custom Service contain all the CRUD methods e.g (get post put delete)
    private router: Router             // Router is is angular built in module for handle routing  
  ) {
    
    this.form = fb.group({
      // userName is a variable hold the value enter by user in  form 
      // after userName variable we set an array for validators 
      userName: ['', [Validators.required, Validators.minLength(5)]], 
      //  password is a variable hold the value enter by user in  form   
      // after userName variable we set an array for validators 
       password: ['', [Validators.required, Validators.minLength(8)]],     });

        // if user is login we should stop to go toward login page 
        //.this if Check either user is login move to api/v1/manager route 
    if (authService.isAuthenticate()) {
      router.navigate(['api/v1/manager']);
    }
  }

// when we click on the login button from form this function will call
 
  login() {
     
    const body = {
      userName: this.form.value.userName,
      password: this.form.value.password,
    };
     // this authService  variable  is creating while injecting service named as CrudService in constructor   
    this.authService
      .post(environment.loginURL, body) // we make a seprate file environment.dev.ts and set all the routes of application in that file  
      .subscribe((response: any) => {   // above (post) method return us an  Observale so we need to subscribe it to receive response or any other updated streams  
        if (response.token) {           // we are checking if token comes from backend means user is authenticated 
          localStorage.setItem('token', JSON.stringify(response.token)); // storing token in browsers local storage that comes from backend 
          this.router.navigate(['/api/v1/manager/view_tasks']);  // after login move toward respective routes according to access
        }
      });
  }
  // this method is use in template for get password variable access in form for implementation of validations 
  public get password() {
    return this.form.get('password');
  }
 // this method is use in template for get password variable access in form for implementation of validations 
  public get userName() {
    return this.form.get('userName');
  }
 // life cycle of angular runs after the constructor 
  ngOnInit(): void {}
}
