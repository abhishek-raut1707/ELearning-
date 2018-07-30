import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl = 'http://localhost:3000';
  constructor(private _http: HttpClient) { }


  getAllExpPageID(getContent: any) {
    console.log(getContent);

    return this._http.post(this.baseUrl + '/all_expss', getContent);
  }

  postUploadImage(comicData: any) {
    console.log('comicData service', comicData);
    return this._http.post(this.baseUrl + '/comic', comicData);
  }

  getExpID(expString: string) {
    return this._http.post(this.baseUrl + '/getExpID', expString);
  }


  testImg(data) {
    return this._http.post(this.baseUrl + '/testImg', data);
  }
}
