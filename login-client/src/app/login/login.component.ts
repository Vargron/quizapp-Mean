import { Component, OnInit } from '@angular/core';
import {UsersService} from"./../users.service"
import { NgModule } from '@angular/core';
import{ FormsModule} from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:object;
  errs;

  constructor(private _service:UsersService, private _router:Router) { 
    this.user={username:''}
    this.errs=[];
    
  }

  login(){
    // console.log("hitting login");
    // console.log(this.user);
    var errs=[]
    this.errs=[]
    if (this.user["username"][0]==" "){
      errs.push("username must not begin with a space")
    }
    if(this.user["username"].length<3){
      // console.log("redirect")
      errs.push("length must be at least 3 characters for example 'ray' is a valid username")
      
      // console.log(this.errs)
    }
    if (errs.length>0){
      for (let i=0;i<errs.length;i++){
        this.errs.push(errs[i])
      }
      
      this._router.navigate(["/"])
    }
    else{
      this._service.login(this.user,(response)=>{
        // console.log("back to componnet");
        // console.log(response);
        this._router.navigate(["/landing"]);
        
      })

    }
  }


  ngOnInit() {
  }

}
