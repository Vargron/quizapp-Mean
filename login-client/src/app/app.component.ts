import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import{ FormsModule} from '@angular/forms';
import {UsersService} from"./users.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentuser;
  
  constructor(private _service:UsersService, private _router:Router){
    this.currentuser=this._service.activeuser
  }

  checksession(callback){
    // console.log("hitting check session")
    this._service.checksesh(()=>{
      this.currentuser=this._service.activeuser
      // console.log("hiting callback")
      callback(this._service.activeuser)
    })
  }

  // choseroute(){
    
    
  //   if (this.currentuser){
      
  //     console.log("user in sesh")
  //   }else{
  //     console.log("no user in sesh")
  //   }
  // }
  logout(){
    
    this._service.logout(()=>{
      // console.log("back in componnet")
      this._router.navigate(["/"])
    })
  }

  ngOnInit(){
    // console.log("hitting on init")
    this.checksession((res)=>{
      // console.log("hitting callback")
      // console.log(res)
      if (!res){
        this._router.navigate(["/"])
      }else{
        
        this._router.navigate(["/landing"])
      }

    })

    
    

  }

}
