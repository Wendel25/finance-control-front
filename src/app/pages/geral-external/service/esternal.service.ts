import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment_local } from './../../../environments/environments.local';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EsternalService {
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

  getDataCEP(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }

  registerProviders(formData: any): Observable<any> {
    const url = `${this.API_URL}new-provider`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, { headers: headers });
  }

  getDataProviders(page: number, pageSize: number): Observable<any> {
    const url = `${this.API_URL}providers?page=${page}&pageSize=${pageSize}`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  registerProvidersLegal(formData: any): Observable<any> {
    const url = `${this.API_URL}new-provider-legal`;
    const headers = this.addTokenToHeaders();
    return this.http.post(url, formData, { headers: headers });
  }

  getDataProvidersLegal(page: number, pageSize: number): Observable<any> {
    const url = `${this.API_URL}providers-legal?page=${page}&pageSize=${pageSize}`;
    const headers = this.addTokenToHeaders();
    return this.http.get(url, { headers: headers });
  }

  updateProviders(id: string, formData: any): Observable<any> {
    const url = `${this.API_URL}update-provider/${id}`;
    const headers = this.addTokenToHeaders();
    return this.http.put(url, formData, { headers: headers });
  }

  updateProvidersLegal(id: string, formData: any): Observable<any> {
    const url = `${this.API_URL}update-provider-legal/${id}`;
    const headers = this.addTokenToHeaders();
    return this.http.put(url, formData, { headers: headers });
  }
}
