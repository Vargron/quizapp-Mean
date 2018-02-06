import { Component, OnInit } from '@angular/core';
import {UsersService} from './../users.service';
import {BehaviorSubject} from 'Rxjs/behaviorsubject'

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  users=[];

  constructor(private _service:UsersService) {
    
   }

  ngOnInit() {
    this._service.users.subscribe((res)=>{
      this.users=res;
      // console.log(res)
    })

  };
  delete(id){
    this._service.delete(id, ()=>{
      // console.log(id)
      this._service.getall(()=>{
        // console.log("hitting callback from get all")
      })
    })
    
  };



}
