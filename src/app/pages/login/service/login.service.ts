import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost:3000/api/';

  login(formData: any): Observable<any> {
    const url = `${this.API_URL}login`;
    return this.http.post(url, formData);
  }
}
