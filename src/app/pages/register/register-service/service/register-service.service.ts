import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment_local } from './../../../../environments/environments.local';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class RegisterServiceService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) { }

  private API_URL_LOCALHOST = environment_local.apiUrl;

  addTokenToHeaders() {
    const token = this.cookie.get('token');

    if (!token) {
      this.router.navigate(['/'])
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return headers
  }

  getServices(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}services`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  getSubCategoriesByCategory(category: string): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}subcategory/${category}`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  getBank(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}bank`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  getDataByBank(bank: string): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}bank/${bank}`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }
}
