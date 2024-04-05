import { Component } from '@angular/core';

import { interval, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

    constructor(){}


  time$ = interval(1000).pipe(map(() => new Date())
)
  }


