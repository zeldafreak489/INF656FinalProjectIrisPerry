import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private recipeService: RecipeService, private cdr: ChangeDetectorRef) {}

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

  deleteRecipe(id: string | undefined) {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this recipe?')) return;

    this.recipeService.delete(id).subscribe({
      next: () => {
        // Remove recipe and trigger change detection
        this.recipes = this.recipes.filter(r => r._id !== id);
        this.cdr.markForCheck(); // force Angular to detect the change
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

}
