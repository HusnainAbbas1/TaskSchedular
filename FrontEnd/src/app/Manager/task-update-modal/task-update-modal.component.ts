import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud-service.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-task-update-modal',
  templateUrl: './task-update-modal.component.html',
  styleUrls: ['./task-update-modal.component.css']
})
export class TaskUpdateModalComponent implements OnInit {

  constructor(private modalService: ModalService,
    private sharedDataService: SharedDataService,
    private fb:FormBuilder,
    private userService :CrudService
    ) { 

      this.form = fb.group({
        userName: ['', [Validators.required, Validators.minLength(2)]],
        role: ['', [Validators.required, Validators.minLength(2)]],
        password: ['', Validators.required],
        leadId: ['', Validators.required],
        currentProject: ['', Validators.required],
        projectDescription:['',[Validators.required]],
        _id: ['', Validators.required],
   
      });
    }
  form!:FormGroup;
  
  display:any;
  updateBody:any;
  id!:string;
  setFormData(){

    this.sharedDataService.getUpdateBody.subscribe(
       (data: any) => {
        console.log(data);
        //  this.updateBody = data[0];
        //  this.updateBody.id = data[0]._id;
        let { currentProject, leadId, password,projectDescription,role,userName,_id } = data[0];
         this.id = _id;     
        this.form.patchValue({
          userName,
          role,
          password,
          currentProject,
          leadId,
          projectDescription
         
        });
      }
    );
  }

  update(){
    
    this.updateBody = {
      userName:this.form.value.userName,
      role:this.form.value.role,
      currentProject:this.form.value.currentProject,
      projectDescription:this.form.value.projectDescription,
      leadId:this.form.value.leadId,
      password:this.form.value.password,
      id:this.id
    };
    console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',this.updateBody);
    this.userService.put(environment.UpdateUser,this.updateBody).subscribe((res)=>{
      console.log(res);
      
    })
    
  }

  close() {
    this.modalService.closeUser('update');
  }
  observeDisplayValue(){

    this.modalService.watchUser('update').subscribe((value:any)=>{
      this.display = value;
      console.log('update modal',value);
  });
  }

  ngOnInit() {
    this.observeDisplayValue();
    this.setFormData();


}

}
