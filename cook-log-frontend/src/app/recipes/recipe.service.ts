import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // your JWT
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<any> {
    return this.http.get(API_URL, this.getAuthHeaders());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, this.getAuthHeaders());
  }
}
