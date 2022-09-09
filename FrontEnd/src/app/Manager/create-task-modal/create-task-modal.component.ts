import { ModalService } from './../../services/modal.service';
 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud-service.service';
 
import { environment } from 'src/environments/environment.dev';
import { Conditional } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent implements OnInit {

  display:any;
  form:FormGroup;  
  unAssignedUsers:any = ['any','many'];
  

  constructor(private fb:FormBuilder,private userService:CrudService,private router:Router,private modalService:ModalService){
  // again this is reactive form for all input fields
    this.form = fb.group({
     taskName:['',[Validators.required,Validators.minLength(2)]],
     leadId:['',[Validators.required]],
     projectName:['',[Validators.required]],
     assignTo:['',[Validators.required]],
     taskDescription:['',[Validators.required,Validators.minLength(2)]],
     taskDate:['',Validators.required]
    
    })
  }
  // run when click on create button in the template 
  create(){
    console.log(this.form);
    let reqName = this.form.value.assignTo;
    let taskDateTime = this.form.value.taskDate;

    let pipe = new DatePipe('en-US');  

    const myFormattedDate = pipe.transform(this.form.value.taskDate, 'shortDate'); // format date and remove the timesstamp from date
    console.log(myFormattedDate);
     
    const body ={   // enclose all the form variables in one JS Object 
     assigneeId:0, 
     taskName:this.form.value.taskName,
     leadId:this.form.value.leadId,
     assignTo:this.form.value.assignTo,
     taskDescription:this.form.value.taskDescription,
     taskDate:myFormattedDate,
     projectName:this.form.value.projectName,
     taskStatus:false
   }

   for(let user of this.unAssignedUsers){   
      if(user.userName == reqName){
         body.assigneeId = user._id;
      }
   }

   console.log(body);
   
   this.userService.post(environment.managerCreateTask, body).subscribe((response :any)=>{
   
    this.close(); // after creation of user close the modal 
    this.router.navigate(['api/v1/manager/view_tasks']);    
  });
 
}
 
   observeDisplayValue(){  
    this.modalService.watchTask('create').subscribe((value:any)=>{ // watchTask is method in modal service and 
      this.display = value;      // this function continously listen the value of Behavior Subjeect 
                                 // if  value is true then set ( display variable  value as true) if display value true modal will open otherwise not 
  });
  }

  close() {
    this.modalService.closeTask('create');   // this function change  the value BehaviorSubject from true to flase  
  } 
  
  fetchUnAssignedUsers(){   // fetch all those users who has not been assigned any task yet by manager 

     this.userService.get(environment.unAssignedUsers).subscribe((res:any)=>{
      this.unAssignedUsers = res.unAssignedUsers;
  
     })
  }

  ngOnInit() {

    this.observeDisplayValue(); 
    this.fetchUnAssignedUsers();
  
  }
     

}
