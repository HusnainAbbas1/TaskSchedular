import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from './../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/services/crud-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.css'],
})
export class CreateUserModalComponent implements OnInit {
  display: any;
  form: FormGroup;

  constructor(
    private modalService: ModalService,
    private userService: CrudService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // again this is reactive form variables for all input fields
    this.form = fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', [Validators.required]],
      currentProject: ['', Validators.required],
      skills: ['', Validators.required],
      projectDescription: ['', Validators.required],
      leadId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      taskStatus: ['', Validators.required],
    });
  }

  observeDisplayValue() {
    this.modalService.watchUser('create').subscribe((value: any) => { // watchTask is method in modal service and
      this.display = value;                          // this function continously listen the value of Behavior Subjeect
      // if  value is true then set ( display variable  value as true) if display value true modal will open otherwise not
    });
  }
 
  // run when click on create button in the template
  create() {
    console.log(this.form);
    const body = {
      // enclose all the form variables in one JS Object
      userName: this.form.value.userName,
      role: this.form.value.role,
      currentProject: this.form.value.currentProject,
      skills: this.form.value.skills,
      projectDescription: this.form.value.projectDescription,
      leadId: this.form.value.leadId,
      password: this.form.value.password,
      taskStatus: false,
    };

    this.userService
      .post(environment.createUser, body)
      .subscribe((response: any) => {
        console.log('res...........', response);
        this.close();
      });
  }
  fileEvent(file: any) {
    console.log(file);
  }

  close() {
    // after creation of user close the modal
    // this function  will set value of BehaviorSubject false  
    this.modalService.closeUser('create');
  }

  ngOnInit() {
    this.observeDisplayValue();
  }
}
