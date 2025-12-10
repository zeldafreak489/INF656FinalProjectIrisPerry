import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  imports: [NgForOf, RouterModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
  standalone: true
})
export class RecipeList implements OnInit {
    recipes: any[] = [];

    constructor(private recipeService: RecipeService) {}

    ngOnInit(): void {
      this.loadRecipes();
    }

    loadRecipes() {
      this.recipeService.getAll().subscribe({
        next: (res: Recipe[]) => this.recipes = res,
        error: (err: any) => console.error(err)
      });
    }

    deleteRecipe(id: string) {
      if (!confirm('Are you sure you want to delete this recipe?')) return;

      this.recipeService.delete(id).subscribe({
        next: () => {
          this.recipes = this.recipes.filter(r => r._id !== id);
        },
        error: (err: any) => console.error(err)
      });
    }
}
