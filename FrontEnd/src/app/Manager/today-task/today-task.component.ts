import { CrudService } from 'src/app/services/crud-service.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-today-task',
  templateUrl: './today-task.component.html',
  styleUrls: ['./today-task.component.scss']
})
export class TodayTaskComponent implements OnInit {
  constructor(
    private sharedDataService: SharedDataService,
    private authService: CrudService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}
  
  
  isChecked:boolean = true;
  
  testVar = 0;
  pageNumber = 0;
  totalTasks = 20;
  tasksPerPage = 10;
  totalPages = 0;
   
  allTasksList: Array<any> = [];
  
  openCreateTaskModal(){
    console.log('your task add button opens');
    this.modalService.openTask('create')
  }
  
  checkBox(assigneeId:any,taskId:any,taskStatus:boolean){
      taskStatus = !taskStatus
      console.log('form cehck front',taskStatus);
     this.completeStatus(taskStatus,assigneeId,taskId);
   }
  
  deleteTask(id: any) {
    let body = {
       id,
    };
    this.authService
      .delete(environment.deleteSchedule, body)
      .subscribe((res) => {
        console.log(res);
        // this.getTaskLists();
      });
  }

  updateTask(id: string) {
    let body = this.allTasksList.filter((task) => {
      return task._id == id;
    });

    this.sharedDataService.setUpdateBody(body);
  }
  // getTaskLists = (page:Number = 1) => {
     
  //   this.allTasksList = []
  //   let queryString = `?page=${page}&pageSize=${9}`;
    
  //   this.authService
  //     .get(environment.getAllPosts + queryString)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //       this.allTasksList = res.body.getAllTasks;
  //       this.totalPages = res.body.totalPages;
  //     });
  // };
  trackTasks(index: any, task: any) {
    return task ? task._id : undefined;
  }

  // onChangePage(pageNo: Number) {
  //   this.getTaskLists(pageNo)
  // }

  completeStatus(status:any,assigneeId:any,taskId:any){
    console.log('ckeck',assigneeId,'..................',status);
    let body={
      taskStatus:status,
      id:assigneeId,
      taskId
    }
   this.authService.put(environment.changeTaskStatus,body).subscribe((res)=>{
    console.log(res);
   })
  }
  
 
  getTodayTasks(){
    this.authService.get(environment.todayTasks).subscribe((res:any)=>{  
      console.log(res);     
      this.allTasksList = res.tasks;
    })
  }

  ngOnInit(): void {
    console.log('from today ');
       this.getTodayTasks();

  }

}
