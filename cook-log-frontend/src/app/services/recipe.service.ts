import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // or however you store JWT
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<any> {
    return this.http.get(API_URL, this.getAuthHeaders());
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/${id}`, this.getAuthHeaders());
  }

  create(recipe: any): Observable<any> {
    return this.http.post(API_URL, recipe, this.getAuthHeaders());
  }

  update(id: string, recipe: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, recipe, this.getAuthHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, this.getAuthHeaders());
  }
}
