import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-content-find',
  templateUrl: './content-find.component.html',
  styleUrls: ['./content-find.component.scss']
})
export class ContentFindComponent implements OnInit {

  contentID = {
    name: 'confluence'
  };
  constructor(private apiServ: ApiServiceService) { }

  ngOnInit() {
  }

  parseContent(event: any) {
    this.apiServ.getAllExpPageID(this.contentID)
    .subscribe(data => {
      console.log(data);
    });
  }

}
