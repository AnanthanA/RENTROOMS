import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msgId: number = null;

  constructor(private routes: ActivatedRoute) {
    this.routes.queryParams.subscribe(p => {
      // console.log(p);
      
      if (p.msgId) this.msgId = p.msgId
    });
  }


  ngOnInit(): void {

  }

}
