import { SharedDataService } from './../../services/shared-data.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { SchedularService } from '../../services/schedular.service';
import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { CrudService } from '../../services/crud-service.service';
import { map } from 'rxjs';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, OnDestroy {
  
  constructor(
    private sharedDataService: SharedDataService,
    private authService: CrudService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  
  testVar = 0;
  pageNumber = 0;
  totalTasks = 20;
  tasksPerPage = 10;
  totalPages = 0;
   
  allTasksList: Array<any> = [];

  deleteTask(id: any) {
    let body = {
       id,
    };
    this.authService
      .delete(environment.deleteSchedule, body)
      .subscribe((res) => {
        console.log(res);
        this.getTaskLists();
      });
  }
  updateTask(id: string) {
    let body = this.allTasksList.filter((task) => {
      return task._id == id;
    });

    this.sharedDataService.setUpdateBody(body);
  }
  getTaskLists = (page:Number = 1) => {
     
    this.allTasksList = []
    let queryString = `?page=${page}&pageSize=${9}`;
    
    this.authService
      .get(environment.getAllPosts + queryString)
      .subscribe((res: any) => {
        console.log(res);
        this.allTasksList = res.body.getAllTasks;
        this.totalPages = res.body.totalPages;
      });
  };
  trackTasks(index: any, task: any) {
    return task ? task._id : undefined;
  }
  onChangePage(pageNo: Number) {
    this.getTaskLists(pageNo)
  }
  ngOnInit(): void {
    this.getTaskLists();
  }
 
  ngOnDestroy(): void {
    console.log(
      'destr9999999999999999999999999999999999999999999999999999999999999999999999999'
    );
  }
}
