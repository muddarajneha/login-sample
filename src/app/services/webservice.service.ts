import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private http: HttpClient) { }

  //url retrieved from environment.ts
  baseUrl = environment.baseUrl;

  //service to post login data
  loginData(body: any): Observable<any> {
    let headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    console.log(body.data);
    let loginUrl = this.baseUrl+'/login';
    return this.http.post(loginUrl, body.data, headers).pipe(
      tap(data => console.log('submitted:' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  //service to post register data
  registerData(body: any): Observable<any> {
    let headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    console.log(body.data);
    let registerUrl = this.baseUrl+'/register';
    return this.http.post(registerUrl, body.data, headers).pipe(
      tap(data => console.log('Registered:' + data)),
      catchError(this.handleError));
  }

  //service to get all the users details
  getData(): Observable<any> {
    let welcomeUrl = this.baseUrl+'/users';
    return this.http.get(welcomeUrl).pipe(
      tap(data => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  //handle error
  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message);
  };
}
