import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserInfoModel } from './model/userinfo.model';
import { LoginModel } from './model/login.model';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly BASE_URL = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) { } 

  checkEmail(emailId: string) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<UserInfoModel>(`${this.BASE_URL}/user/check/email/${emailId}`,null, { headers: headers, observe: 'response' })
      .pipe(catchError((e) => { return throwError(e); }));
  }

  signUp(payload: UserInfoModel) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<UserInfoModel>(`${this.BASE_URL}/user/signup`, JSON.stringify(payload), { headers: headers, observe: 'response' })
      .pipe(catchError((e) => { return throwError(e); }));
  }

  logIn(payload: LoginModel) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<UserInfoModel>(`${this.BASE_URL}/user/login`, JSON.stringify(payload), { headers: headers, observe: 'response' })
      .pipe(catchError((e) => { return throwError(e); }));
  }
}
