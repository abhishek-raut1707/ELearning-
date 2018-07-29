import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _http: HttpClient) { }


  getAllExpPageID(contentID: any) {
    return this._http.post(environment.baseurl + '/add_expression_from_confluence', contentID);
  }

  postUploadImage() {

  }

  getExpID(expString: string) {
    return this._http.post(environment.baseurl + '/getExpID', expString);
  }

}
