import { SharedDataService } from './../../services/shared-data.service';
import { Router } from '@angular/router';
import { SchedularService } from '../../services/schedular.service';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { CrudService } from '../../services/crud-service.service';

interface allTasks  {
  _id:string,
  taskDate:Date,
  taskDescription:string,
  taskName:string
  }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit,allTasks {

  constructor(private sharedDataService:SharedDataService,private authService:SchedularService,private router:Router) { }
  
  _id!: string;
  taskDate!: Date;
  taskDescription!: string;
  taskName!: string;
 
  allTasksList: Array<allTasks> = [];
   
  deleteTask(id:any){
   let body={
      taskId:id 
     }
     this.authService.delete(environment.deleteSchedule,body).subscribe((res)=>{
      console.log(res);
      this.getTaskLists()
      
     })
  }
  updateTask(id:string){
    let body = this.allTasksList.filter((task)=>{
         return task._id == id
    })

    this.sharedDataService.setUpdateBody(body);    

    //  this.authService.put(environment.updateSchedule,body).subscribe((response)=>{
    //   console.log(response);

    //  }) 
}
  getTaskLists = () => {
    this.authService.get(environment.getAllPosts).subscribe((res:any)=>{
      this.allTasksList = res.getAllTasks;
      console.log('hhhhhhhhhhhhh',this.allTasksList);
   })
  }
  trackTasks(index:any,task:any){
    return task?task._id:undefined;

  }
  ngOnInit(): void {
    this.getTaskLists()
  }

   

}
