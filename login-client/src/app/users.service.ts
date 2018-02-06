import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'Rxjs/behaviorsubject'
import { Router } from '@angular/router';

@Injectable()
export class UsersService {
  users:BehaviorSubject<any[]>= new BehaviorSubject([]);
  questions:BehaviorSubject<any[]>= new BehaviorSubject([]);
  game:BehaviorSubject<any[]>= new BehaviorSubject([]);
  games:BehaviorSubject<any[]>= new BehaviorSubject([]);
  activeuser;
  searchres:BehaviorSubject<any[]>= new BehaviorSubject([]);
  lastgame:BehaviorSubject<any>= new BehaviorSubject({});
  
  targetuser:Object;

  updateData(newData:any):void{
    // console.log("hitting update")
    // console.log(this.users)
    // console.log(newData)
    this.users.next(newData);

    
  };
  constructor(private http:HttpClient, public router:Router ) {
    this.targetuser={};
    this.activeuser={};
    // console.log("hitting on init in service")
    this.getall((res)=>{
      // console.log(res,"in service oninit")
      this.users.next(res);
    })
    this.getallquestions((res)=>{
      this.questions.next(res)
    })
    this.getallgames((res)=>{
      this.games.next(res)
    })
  }

  login(user,callback){
    // console.log("in userservice")
    this.http.post('/login', user).subscribe(
      (response)=>{
        this.activeuser=response
        // console.log("hitting call back in service", response);
        this.getall(()=>{})
        callback(response);
        
      }
      
    )
    
  };
  checksesh(callback){
    // console.log("in service heading to backend")
    this.http.get("/session").subscribe(
      (response)=>{
        
        // console.log("returning from backend");
        // console.log(response);
        this.activeuser=response
        callback(response);
      }
    )
    
  };
  logout(callback){
    // console.log("hitting service logout")
    this.http.get("/clearsession").subscribe(
      (response)=>{
        // console.log("back to service");
        // console.log("response",response );
        callback();
      }
      
    )
    
  }
  getall(callback){
    // console.log("hitting users get all")
    this.http.get("/getusers").subscribe(
      (response)=>{
        // console.log("getall",response)
        this.updateData(response)
        callback(response)
      }

    )

  };
  delete(id, cb){
    
    // console.log("delete",id)
    this.http.post("/deleteuser", {'id':id}).subscribe(
      (res)=>{
          cb(res)
      }
    )
  };
  viewaddquestion(){
    this.router.navigate(["newquestion"])
  }

  addnewquestion(question, cb){
    // console.log("in add suestion")
    // console.log(question, "inservice")
    var  finalq={
      prompt:question.prompt,
      correct:question.correct,
      answers:[],

    }
    
    
    var tar=0
    
    tar=(Math.floor(Math.random()*3))
    // console.log(tar)
    var count=0;
    for(let i=0; i<3;i++){
      if (i==tar){
        finalq.answers.push(question.correct)
      }else if(count==0){
        finalq.answers.push(question.false1)
        count++;
      }else{
        finalq.answers.push(question.false2)
      }
    }
      // finalq.answers.push(anssrc[tar])
      // anssrc.slice(tar,1)
      // console.log(anssrc)

    
    // console.log(finalq)
    this.http.post("/addquestion",finalq).subscribe(
      (res)=>{
        // console.log(res)
        this.getallquestions((res)=>{
          // console.log(res)
        })

    })
    
    
    

    cb()

  }
  getallquestions(cb){
    this.http.get("/allquestions").subscribe(
      (questions)=>{
        // console.log(questions)
        // this.questions.next(questions)
        cb(questions)
      }
    )

  }

  makegame(cb){
    this.getallquestions(()=>{
      // console.log("in make game")
      // console.log(this.questions.getValue())
      var questions=this.questions.getValue()
      
      var game=[];
      var tar={};
      var tari=0
      let check=false;
      var dquest={
        prompt:"hello how are you",
        correct:"fine",
        answers:["fine", "amazing", "terrrible"],
  
      }
      while(game.length<3){
        if (questions.length==0){
          game.push(dquest)
        }
        tari=Math.floor(Math.random()*questions.length)
        tar=questions[tari]
        questions[tari]=questions[questions.length-1]
        questions.pop()

        
        game.push(tar)
        
      }

      
      this.game.next(game);
      this.getallquestions((res)=>{
        this.questions.next(res)
        cb(game)
      })

    })





  }
  postgame(game,cb){
    this.http.post("/postgame", game).subscribe(
      (result)=>{
        // console.log(result)
        this.lastgame.next(game)

        cb(result)
      }
    )
    
  }
  getallgames(cb){
    this.http.get("/allgames").subscribe(
      (games)=>{
        
        // console.log(games)
        cb(games)
      }
    )
  }

  searchgames(txt,cb){
    function charmatch(comp, string){
      var cur=0;
      var check=false;
      for(let i=0;i<string.length;i++){
        cur=0
        while(string[cur+i]==comp[cur]&&cur<comp.length){
          check=true
          cur++;
        }
        if(check&&cur==comp.length){
          return true
        }
      }
      return false
      }

    
    var arr=this.games.getValue()
    var ans=[]
    for( let i=0; i<arr.length;i++){
      if( charmatch(txt,arr[i].user)||charmatch(txt,arr[i].score)||charmatch(txt,arr[i].percentage)){
        ans.push(arr[i])
      }
    }
    // console.log(ans)
    this.searchres.next(ans)
    this.router.navigate(["search"])
    cb(ans)

      
    }

  }
