import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegisterServiceService {
  constructor(
    private http: HttpClient,
  ) { }

  private API_URL_LOCALHOST = 'http://localhost:3000/api/';

  getServices(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}services`;
    return this.http.get(url);
  }

  getSubCategoriesByCategory(category: string): Observable <any>{
    const url = `${this.API_URL_LOCALHOST}subcategory/${category}`;
    return this.http.get(url);
  }

  getBank(): Observable <any>{
    const url = `${this.API_URL_LOCALHOST}bank`;
    return this.http.get(url);
  }

  getDataByBank(bank: string): Observable <any>{
    const url = `${this.API_URL_LOCALHOST}bank/${bank}`;
    return this.http.get(url);
  }
}
