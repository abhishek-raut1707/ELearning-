import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data;
  constructor(private apiServ: ApiServiceService) { }

  ngOnInit() {
  }

  sendID(event: any) {
    console.log(this.data);
    
    this.apiServ.getExpID(this.data)
  }

}
