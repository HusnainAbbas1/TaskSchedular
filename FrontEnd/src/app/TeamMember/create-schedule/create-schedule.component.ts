import { CrudService } from './../../services/crud-service.service';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { SchedularService } from 'src/app/services/schedular.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent  {
 
  form:FormGroup;

  constructor(private fb:FormBuilder,private service:CrudService,private router:Router,){
   this.form = fb.group({
     taskName:['',[Validators.required,Validators.minLength(2)]],
     taskDescription:['',[Validators.required,Validators.minLength(2)]],
     taskDate:['',Validators.required]
   
    })
  }
  
  create(){
    console.log(this.form);
    const body ={
     taskName:this.form.value.taskName,
     taskDescription:this.form.value.taskDescription,
     taskDate:this.form.value.taskDate
   }
   
   this.service.post(environment.createSchedule, body).subscribe((response :any)=>{
    console.log(response);
    this.router.navigate(['/home']);    
  });
  }
  
  public get taskName() {
   return this.form.get('taskName');
  }
  
  public get taskDescription(){
   return this.form.get('taskDescription');
  }
 

}
