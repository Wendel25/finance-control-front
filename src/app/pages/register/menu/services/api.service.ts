import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment_local } from './../../../../environments/environments.local';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {}

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

  getCategory(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}categories`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  createCategory(formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}new-category`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}category/${id}`;
    const headers = this.addTokenToHeaders();
    return this.http.delete(url, { headers });
  }

  getSubCategory(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}subcategories`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  createSubCategory(formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}new-subcategory`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, {headers: headers});
  }

  deleteSubCategory(id: number): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}subcategory/${id}`;
    const headers = this.addTokenToHeaders();
    return this.http.delete(url, {headers: headers});
  }

  registerUser(formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}register-user`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, { headers: headers });
  }

  getUsers(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}users`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  updateUsers(id: string, formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}user/${id}`;
    const headers = this.addTokenToHeaders();
    return this.http.put(url, formData, {headers: headers});
  }

  getAccounts(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}accounts`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  insertAccount(formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}new-accounts`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, {headers: headers});
  }

  updateAccount(id: string, formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}account/${id}`;
    const headers = this.addTokenToHeaders();
    return this.http.put(url, formData, {headers: headers});
  }

  getDataProviders(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}providers`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }
}
