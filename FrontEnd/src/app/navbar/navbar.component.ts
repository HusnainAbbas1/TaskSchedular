import { CrudService } from './../services/crud-service.service';
import { Router  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import {logo} from '../../../src/assets/SMART.png';

// import { SchedularService } from '../services/schedular.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor( private router:Router,private authService:CrudService) { }


  isAuthenticate(){ 
  let token = localStorage.getItem('token');
   return (token)?true:false;
  }
  
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']); 
  }

  ngOnInit(): void {
  }

}
