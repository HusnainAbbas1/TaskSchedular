import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from './../../services/modal.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { CrudService } from 'src/app/services/crud-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';

 
@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css']
})
export class CreateUserModalComponent implements OnInit {

  display:any;
  form:FormGroup;
 
  skills=[
    {id:1,name:'Angular'},  
    {id:2,name:'Node'},
    {id:3,name:'Express'},
    {id:4,name:'AWS'}, 
    {id:5,name:'Simplify'},
    {id:6,name:'S3'},
    {id:7,name:'Mongo DB'},
    {id:8,name:'Dynamo DB'},
   ]
   
  // dropdownSettings = {
  //   idField: 'id',
  //   textField: 'name',
  // };

  constructor(
      private modalService: ModalService,
      private userService: CrudService,
      private router : Router,
      private fb:FormBuilder
  ) {

    this.form = fb.group({
      userName:['',[Validators.required,Validators.minLength(4)]],
      role:['',[Validators.required]],
      currentProject:['',Validators.required],
      skills:['',Validators.required],
      projectDescription:['',Validators.required],
      leadId:['',[Validators.required]],
      password:['',[Validators.required]],
      taskStatus:['',Validators.required]

    })
   }
   
   observeDisplayValue(){

    this.modalService.watchUser('create').subscribe((value:any)=>{
      this.display = value;
      console.log('create modal',value);
  });
  }
  ngOnInit() {
  this.observeDisplayValue();
}
   
  create(){
    console.log(this.form);
     const body ={
     userName:this.form.value.userName,
     role:this.form.value.role,
     currentProject:this.form.value.currentProject,
     skills:this.form.value.skills,
     projectDescription:this.form.value.projectDescription,
     leadId:this.form.value.leadId,
     password:this.form.value.password,
     taskStatus:false
   }
   
   this.userService.post(environment.createUser, body).subscribe((response :any)=>{
    console.log('res...........',response);
     
  });
   
  }
  fileEvent(file:any){
    console.log(file);
  }

  close() {
    this.modalService.closeUser('create');
  }
  

}