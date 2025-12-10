import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private storageKey = 'recipes';
  private recipesSubject = new BehaviorSubject<Recipe[]>(this.loadLocalRecipes());

  constructor(private http: HttpClient) {}

  private loadLocalRecipes(): Recipe[] {
    const localData = localStorage.getItem(this.storageKey);
    return localData ? JSON.parse(localData) : [];
  }

  private saveLocalRecipes(recipes: Recipe[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(recipes));
    this.recipesSubject.next(recipes); // update subscribers
  }

  // Observable for components to subscribe to
  get recipes$(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  getAll() {
    // Fetch from backend to update localStorage
    this.http.get<Recipe[]>('http://localhost:3000/api/recipes')
      .subscribe({
        next: (res) => this.saveLocalRecipes(res),
        error: (err) => console.error(err)
      });

    return this.recipes$; // always return observable
  }

  getById(id: string): Observable<Recipe> {
    const recipes = this.loadLocalRecipes();
    const found = recipes.find(r => r._id === id);
    if (found) {
      return of(found);
    }
    return this.http.get<Recipe>(`http://localhost:3000/api/recipes/${id}`).pipe(
      tap(res => {
        const updated = recipes.filter(r => r._id !== id);
        updated.push(res);
        this.saveLocalRecipes(updated);
      })
    );
  }

  create(recipe: Recipe) {
    return this.http.post<Recipe>('http://localhost:3000/api/recipes', recipe)
      .pipe(tap(newRecipe => {
        const updated = [...this.loadLocalRecipes(), newRecipe];
        this.saveLocalRecipes(updated);
      }));
  }

  update(id: string, recipe: Recipe) {
    return this.http.put<Recipe>(`http://localhost:3000/api/recipes/${id}`, recipe)
      .pipe(tap(updatedRecipe => {
        const updated = this.loadLocalRecipes().map(r => r._id === id ? updatedRecipe : r);
        this.saveLocalRecipes(updated);
      }));
  }

  delete(id: string) {
    return this.http.delete(`http://localhost:3000/api/recipes/${id}`)
      .pipe(tap(() => {
        const updated = this.loadLocalRecipes().filter(r => r._id !== id);
        this.saveLocalRecipes(updated);
      }));
  }
}
