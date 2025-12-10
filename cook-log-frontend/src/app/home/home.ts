// src/app/home/home.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  featuredRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    this.loadFeatured();
  }

  loadFeatured() {
    this.recipeService.getAll().subscribe({
      next: (res) => {
        // Take first 4 recipes for featured
        this.featuredRecipes = res.slice(0, 4);
      },
      error: (err) => console.error(err)
    });
  }
}
