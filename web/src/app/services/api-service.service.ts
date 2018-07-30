import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _http: HttpClient) { }


  getAllExpPageID(getContent: any) {
    return this._http.post(environment.baseurl + '/all_expss', getContent);
  }

  postUploadImage() {

  }

  getExpID(expString: string) {
    return this._http.post(environment.baseurl + '/getExpID', expString);
  }

}
