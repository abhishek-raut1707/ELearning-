import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private _http: HttpClient) { }


  getAllExpPageID() {
    return this._http.get(environment.baseurl + '/getAll');
  }

  postUploadImage() {

  }

  getExpID(expString: string) {
    return this._http.post(environment.baseurl + '/getExpID', expString);
  }

}
