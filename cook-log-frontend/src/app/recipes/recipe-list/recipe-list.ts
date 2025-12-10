import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ← THIS IS REQUIRED
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css']
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.recipes$.subscribe({
      next: (res) => {
        this.recipes = res;
      },
      error: (err) => console.error(err)
    });

    // Trigger a backend fetch to update localStorage
    this.recipeService.getAll();
  }
}
