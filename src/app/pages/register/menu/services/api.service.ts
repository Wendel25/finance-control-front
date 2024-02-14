import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  private API_URL_LOCALHOST = 'http://localhost:3000/api/';

  getCategory(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}categories`;
    return this.http.get(url);
  }

  createCategory(formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}new-category`;
    return this.http.post(url, { category: formData.category });
  }

  deleteCategory(id: number): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}category/${id}`;
    return this.http.delete(url);
  }

  getSubCategory(): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}subcategories`;
    return this.http.get(url);
  }

  createSubCategory(formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}new-subcategory`;
    return this.http.post(url, { category: formData.category, subCategory: formData.subCategory });
  }

  deleteSubCategory(id: number): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}subcategory/${id}`;
    return this.http.delete(url);
  }

  registerUser(formData: any): Observable<any> {
    const url = `${this.API_URL_LOCALHOST}register-user`;
    return this.http.post(url, {
      name: formData.nameNewUser,
      nameRBX: formData.nameRBXNewUser,
      email: formData.emailNewUser,
      password: formData.passwordNewUser
    });
  }

  getUsers(): Observable<any>{
    const url = `${this.API_URL_LOCALHOST}users`;
    return this.http.get(url);
  }
}
