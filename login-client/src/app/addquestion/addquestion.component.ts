import { Component, OnInit } from '@angular/core';
import { UsersService} from './../users.service';


@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  new_question={
    prompt:"",
    correct:"",
    false1:"",
    false2:"",

  }

  constructor(private _service:UsersService) { 

  }

  ngOnInit() {
  }

  submitquestion(){
    // console.log("in componet")
    this._service.addnewquestion(this.new_question,()=>{
      this.new_question={
        prompt:"",
        correct:"",
        false1:"",
        false2:"",
    
      }
      this._service.router.navigate(['landing'])
    
    })
  }

}
