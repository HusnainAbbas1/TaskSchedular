import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-side-bar',
  templateUrl: './manager-side-bar.component.html',
  styleUrls: ['./manager-side-bar.component.css']
})
export class ManagerSideBarComponent implements OnInit {

  constructor(private router :Router) { }

  isAuthenticate(){ 
    let token = localStorage.getItem('token');   // get token from local storage and return 
     return (token)?true:false;
    }

    // on logout click we will remove token from local storag,and when system check
    // if doesn't found any token system will return user to login page
    logout(){
      localStorage.removeItem('token'); 
      this.router.navigate(['/']); 
    }


  ngOnInit(): void {
  }

}
