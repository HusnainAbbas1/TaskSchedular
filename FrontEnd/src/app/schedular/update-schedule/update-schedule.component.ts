import { SharedDataService } from './../../services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedularService } from 'src/app/services/schedular.service';
import { environment } from 'src/environments/environment.dev';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css'],
})
export class UpdateScheduleComponent implements OnInit {
  form: FormGroup;
  updateFormBody!: object;
  subscription!: Subscription;

  constructor(
    private sharedDataService: SharedDataService,
    private fb: FormBuilder,
    private authService: SchedularService,
    private router: Router,
    private activatedService: ActivatedRoute
  ) {
    this.form = fb.group({
      taskName: ['', [Validators.required, Validators.minLength(2)]],
      taskDescription: ['', [Validators.required, Validators.minLength(2)]],
      taskDate: ['', Validators.required],
    });
  }

  public get taskName() {
    return this.form.get('taskName');
  }

  public get taskDescription() {
    return this.form.get('taskDescription');
  }

  setFormData(){

    this.subscription = this.sharedDataService.getUpdateBody.subscribe(
      (data: any) => {
        let { taskName, taskDescription, taskDate } = data[0];
        this.form.patchValue({
          taskName,
          taskDescription,
          taskDate: formatDate(taskDate, 'yyyy-MM-dd', 'en'),
        });
      }
    );
  }
  
  upDate(){
    let id = this.activatedService.snapshot.paramMap.get('id') as string;
    
    const body ={
      id,
      taskName:this.form.value.taskName,
      taskDescription:this.form.value.taskDescription,
      taskDate:this.form.value.taskDate
    }

    this.authService
      .put(environment.updateSchedule,body)
      .subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/home']);
      });
  }

  ngOnInit(): void {

    this.setFormData();
    
 
  }
}
