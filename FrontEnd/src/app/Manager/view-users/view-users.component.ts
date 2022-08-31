import { SharedDataService } from './../../services/shared-data.service';
import { CrudService } from './../../services/crud-service.service';
import { ModalService } from './../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
})
export class ViewUsersComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private userService: CrudService,
    private sharedDataService:SharedDataService
  ) {}

  users: any = [];

  getAllManagerChilds(){
    this.userService
    .get(environment.getAllManagerChilds)
    .subscribe((res: any) => {
      console.log(res);
      this.users = res.Users;
    });

  }

  openCreateUserModal() {
    this.modalService.openUser('create');
  }
  
  openUpdateMOdal(id:any){
    this.modalService.openUser('update');
  
    let updateBody =  this.users.filter((user:any)=>{
      return id === user._id
    });

     updateBody.id = id;
    this.sharedDataService.setUpdateBody(updateBody); 
   this.getAllManagerChilds();
  
    
  }
Delete(id:any){
  let body={
    id,
  }
this.userService.delete(environment.deleteUser,body).subscribe((res)=>{
   console.log(res);
   this.getAllManagerChilds();
})

}

  ngOnInit(): void {
    this.getAllManagerChilds();
     }
}
