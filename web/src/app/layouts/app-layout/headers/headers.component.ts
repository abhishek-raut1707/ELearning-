import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  userStatus = 'test';
  constructor(private router: Router) { }

  ngOnInit() {
    console.log('this.router.url', this.router.url);
  }

}
