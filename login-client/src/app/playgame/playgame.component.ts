import { Component, OnInit } from '@angular/core';
import {UsersService} from './../users.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css']
})
export class PlaygameComponent implements OnInit {
  questions=[];
  quiz={
    question1:"",
    question2:"",
    question3:"",
  }
  errors=[]
  constructor(private _service:UsersService, private router:Router) { }

  ngOnInit() {
    this._service.makegame(()=>{
      this._service.game.subscribe((res)=>{
        this.questions=res;
      })
    })

  }

  submitgame(){
    // console.log("hitting submit game")
    var qs=this.quiz
    // console.log(this.quiz)
    var check=true
    var errors=[]
    if(qs.question1==""){
      errors.push("you must answer question1")
      
    }
    if(qs.question2==""){
      errors.push("you must answer quesiton2")
    }
    if(qs.question3==""){
      errors.push("you must answer quesstion3")
    }
    if(errors.length>0){
      // console.log(errors)
      this.errors=errors
    }else{
      var score=0
      if (qs.question1==this.questions[0].correct){
        score++
      }
      if(qs.question2==this.questions[1].correct){
        score++
      }
      if(qs.question3==this.questions[2].correct){
        score++;
      }
      // console.log(score)

      //above here works
      this._service.checksesh(
        (res)=>{
          this._service.activeuser=res

          var result={
            user:res.username,
            score:score,
            percentage:score/3*100,
   
    
          }
          // console.log(result)
          this._service.postgame(result,
            (res)=>{
              // console.log(res)
              this._service.getallgames((games)=>{
                this._service.games.next(games)
                this.router.navigate(["landing"])
              })

              
            }
          )

        }
      )

    }
  }


}
