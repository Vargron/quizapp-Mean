import { Component, OnInit } from '@angular/core';
import {UsersService} from './../users.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  activeuser;
  games;
  searchtxt;
  lastgame;


  constructor(private _service:UsersService) { 
    this.activeuser=_service.activeuser;
    this._service.games.subscribe(
      (games)=>{
        this.games=games;
      }

    )
    this.searchtxt="";
    this._service.lastgame.subscribe(
      (game)=>{
        this.lastgame=game;
      }
    )
  }

  ngOnInit() {
  }

  viewaddquestion(){
    //sends to addquestionform
    // console.log("hitting add")
    this._service.lastgame.next({})
    this._service.viewaddquestion()
  }

  makegame(){
    this._service.makegame((res)=>{
      // console.log(res)
      this._service.router.navigate(["play"])
    })
  }
  getgames(){
    this._service.getallgames(
      (games)=>{
        // console.log(games)
      }
    )

  }
  search(){
    // console.log("search")
    // console.log(this.searchtxt)
    this._service.searchgames(this.searchtxt, ()=>{
      this.searchtxt="";
      this._service.lastgame.next({})

    })
  }

}
