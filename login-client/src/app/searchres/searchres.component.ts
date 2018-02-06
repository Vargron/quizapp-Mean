import { Component, OnInit } from '@angular/core';
import { UsersService} from './../users.service';

@Component({
  selector: 'app-searchres',
  templateUrl: './searchres.component.html',
  styleUrls: ['./searchres.component.css']
})
export class SearchresComponent implements OnInit {
  games;

  constructor(private _service:UsersService) { 
    this._service.searchres.subscribe(
      (games)=>{
        this.games=games;
      }
      
    )

  }

  ngOnInit() {
  }

  goback(){
    this._service.router.navigate(["landing"])
  }

}
