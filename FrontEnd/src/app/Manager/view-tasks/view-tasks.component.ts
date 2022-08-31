import { ModalService } from './../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud-service.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss'],
})
export class ViewTasksComponent implements OnInit {
  constructor(
    private sharedDataService: SharedDataService,
    private authService: CrudService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  isChecked: boolean = true;

  testVar = 0;
  pageNumber = 0;
  totalTasks = 20;
  tasksPerPage = 10;
  totalPages = 0;
  filterbyStatus: any;
  allTasksList: Array<any> = [];

  openCreateTaskModal() {
    console.log('your task add button opens');
    this.modalService.openTask('create');
  }

  runFilter(event: any) {
    this.filterbyStatus = event.target.value;
    if (this.filterbyStatus == 'Done') {
      console.log('done');
      let filterByDone = this.allTasksList.filter((task) => {
        return task.taskStatus == true;
      });
      this.allTasksList = filterByDone;
    } else {
      console.log('progress');
      let filterByProgress = this.allTasksList.filter((task) => {
        return task.taskStatus == !true;
      });
      this.allTasksList = filterByProgress;
      console.log('progress',filterByProgress);
      
    }
  }

  checkBox(assigneeId: any, taskId: any, taskStatus: boolean) {
    taskStatus = !taskStatus;
    console.log('form cehck front', taskStatus);
    this.completeStatus(taskStatus, assigneeId, taskId);
  }
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
  allTasks(page: Number = 1) {
    console.log('all');
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
  today(page: Number = 1) {
    console.log('today');
    this.allTasksList = [];
    let filter = 'today';
    let queryString = `?page=${page}&pageSize=${9}&filterby=${filter}`;

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
    let queryString = `?page=${page}&pageSize=${9}&filterby=${filter}`;

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
    this.getTaskLists(pageNo);
  }
  completeStatus(status: any, assigneeId: any, taskId: any) {
    console.log('ckeck', assigneeId, '..................', status);
    let body = {
      taskStatus: status,
      id: assigneeId,
      taskId,
    };
    this.authService
      .put(environment.changeTaskStatus, body)
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngOnInit(): void {
    this.getTaskLists();
  }

  ngOnDestroy(): void {
    console.log('destr9999999999');
  }
}
