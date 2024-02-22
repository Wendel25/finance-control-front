import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment_local } from './../../../environments/environments.local';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) { }

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

  private API_URL = environment_local.apiUrl;

  getCategory(): Observable<any> {
    const url = `${this.API_URL}product-category`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  insertCategory(formData: any): Observable<any> {
    const url = `${this.API_URL}new-product-category`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, { headers: headers });
  }

  deleteCategory(id: string): Observable<any> {
    const url = `${this.API_URL}product-category/${id}`;
    const headers = this.addTokenToHeaders();
    return this.http.delete(url, { headers: headers });
  }

  getSuppliers(): Observable<any> {
    const url = `${this.API_URL}product-suppliers`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  insertProduct(formData: any): Observable<any> {
    const url = `${this.API_URL}new-product`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, { headers: headers });
  }

  getProducts(): Observable<any>{
    const url = `${this.API_URL}products`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }
}
