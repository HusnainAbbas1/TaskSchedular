import { ModalService } from './../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud-service.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment.dev';
import { cardsAnimations } from './task-animations';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';

 
@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
  animations:[cardsAnimations.FadeIn]
})
export class ViewTasksComponent implements OnInit {

  // Inject all the dependencies 
  constructor(
    private sharedDataService: SharedDataService,
    private authService: CrudService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: ModalService,
    private activatedRoute:ActivatedRoute
  ) {}

  isChecked: boolean = true;
  isAll:boolean = false;
  isToday:boolean = false;
  testVar = 0;
  pageNumber = 0;
  totalTasks = 20;
  tasksPerPage = 10;
  totalPages = 0;
  filterbyStatus: any;
  allTasksList: Array<any> = [];   // original all tasks 
  duplicateAllTasks:Array<any>=[]; // make copy of original tasks 



  openCreateTaskModal() {
    this.modalService.openTask('create');
    this.getTaskLists();
  } 

  // this function will filter today tasks and all tasks 
  runFilter(event: any) {

    this.allTasksList = this.duplicateAllTasks;   //reset filter and populate all tasks again  

   let filterValue =  this.activatedRoute.snapshot.queryParamMap.get('filterby');  // get value from query params
   
   if(filterValue == 'today'){

    const now = new Date();
    let datePipe = new DatePipe('en-US'); //date pipe for format of date 
   
    // filter today tasks from all tasks  
    let todayTasks = this.allTasksList.filter((task)=>{

      const createdDate = datePipe.transform(task.createdAt, 'shortDate'); //remove timeStamp from createdTasks 
      const todayDate = datePipe.transform(now,'shortDate');  // remove timeStamp from today date
      return createdDate == todayDate;              // return whose date match with today date 

    })

  // after filtering all today tasks we will filter on the base of taskStatus
    this.filterbyStatus = event.target.value;

    if (this.filterbyStatus == 'Done') {  //filter all today tasks whose are done
      console.log('done');
      let filterByDone = todayTasks.filter((task) => {
        return task.taskStatus == true;
      });
      this.allTasksList = filterByDone;
    } else {                             //filter all today tasks whose are In Progress
      let filterByProgress = todayTasks.filter((task) => {
        return task.taskStatus == !true;
      });
      this.allTasksList = filterByProgress;
      console.log('progress',filterByProgress);
      
    }
   }else{ // if user clicks on all tasks button then this code block will execute
                                         
    this.filterbyStatus = event.target.value; 
    if (this.filterbyStatus == 'Done') {        //filter all today tasks whose are done
      console.log('done');
      let filterByDone = this.allTasksList.filter((task) => {
        return task.taskStatus == true;
      });
      this.allTasksList = filterByDone;
    } else {
      console.log('progress');                      //filter all today tasks whose are In Progress
      let filterByProgress = this.allTasksList.filter((task) => {
        return task.taskStatus == !true;
      });
      this.allTasksList = filterByProgress;
      console.log('progress',filterByProgress);
      
    }
   }

  }
  
  checkBox(assigneeId: any, taskId: any, taskStatus: boolean) {
    taskStatus = !taskStatus;  //toogle the task Status  at frontend
    this.completeStatus(taskStatus, assigneeId, taskId); // this will update taskStatus at backend 
  }


  deleteTask(id: any) {
    let body = {
      id,
    };
    this.authService
      .delete(environment.deleteSchedule, body)
      .subscribe((res) => {
        
        this.getTaskLists();   // after deletion re-render all tasks again 
      });
  }
  
  updateTask(id: string) {
    let body = this.allTasksList.filter((task) => {
      return task._id == id;  // return only that task whose value will matched 
    });

    this.sharedDataService.setUpdateBody(body); // send data to shared object and from there update modal will get data 
  }
  allTasks(page: Number = 1) {  // fetch all tasks and render on same page   
    this.isToday=false; // on base of this variable we are changing the color of active Tab
    this.isAll=true;  // on base of this variable we are changing the color of active Tab
   

    this.allTasksList = [];
    let filter = 'all';
    let queryString = `?page=${page}&pageSize=${9}&filterby=${filter}`;

    this.authService
      .get(environment.getAllPosts + queryString)
      .subscribe((res: any) => {
        console.log(res);
        this.allTasksList = res.body.getAllTasks;
        this.totalPages = res.body.totalPages;
      });
    
  }
  today(page: Number = 1) { // fetch today tasks and render on same page  
    this.isAll=false;  // on base of this variable we are changing the color of active Tab
    this.isToday=true; // on base of this variable we are changing the color of active Tab 
  
    this.allTasksList = [];
    let filter = 'today'; // pass 'today' as a query params to backend for fetch only today tasks 
    let queryString = `?page=${page}&pageSize=${9}&filterby=${filter}`; // make query string  for today tasks 
    this.authService
      .get(environment.getAllPosts + queryString)
      .subscribe((res: any) => {
        console.log(res);
        this.allTasksList = res.body.getAllTasks;
        this.totalPages = res.body.totalPages;
      });
  }
  getTaskLists = (page: Number = 1) => {
    this.allTasksList = [];
    let filter = 'all';

    let queryString = `?page=${page}&pageSize=${9}&filterby=${filter}`; // make query string to pass extra params to backend regarding paginantion

    this.authService
      .get(environment.getAllPosts + queryString)
      .subscribe((res: any) => {
        
        this.allTasksList = res.body.getAllTasks;
        this.duplicateAllTasks = res.body.getAllTasks; // populate duplicate array 
        this.totalPages = res.body.totalPages;         // 
      });
  };
  // if any task has  already fetched then angular will not fetched again 
  trackTasks(index: any, task: any) {
    return task ? task._id : undefined;
  }
  // change page when click on pagination
  onChangePage(pageNo: Number) {
    this.getTaskLists(pageNo);
  }


  // this function will update user profile as well as taskStatus 
  completeStatus(status: any, assigneeId: any, taskId: any) {
     
    let body = {
      taskStatus: status,
      id: assigneeId,    // id of person to whom this task has been assigned 
      taskId,
    };
    
    this.authService
      .put(environment.changeTaskStatus, body)
      .subscribe((res) => {
        console.log(res);
      });
  }


  // fetch all task when click on view tasks button 
  ngOnInit(): void {
    this.getTaskLists();
  }
    
}
