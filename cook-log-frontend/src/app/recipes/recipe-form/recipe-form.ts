import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css'
})
export class RecipeFormComponent {
  recipeId: string | null = null;
  isEdit = false;
  errorMessage = '';

  recipe: Recipe = {
    title: '',
    description: '',
    instructions: '',
    ingredients: ''
  };

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');

    if (this.recipeId) {
      this.isEdit = true;
      this.recipeService.getById(this.recipeId).subscribe({
        next: (res) => {
          this.recipe = {
            ...res,
            ingredients: Array.isArray(res.ingredients)
              ? res.ingredients.join(', ')
              : ''
          };
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit() {
    const payload: Recipe = {
      ...this.recipe,
      ingredients:
        typeof this.recipe.ingredients === 'string'
          ? this.recipe.ingredients
              .split(',')
              .map(i => i.trim())
              .filter(i => i)
          : this.recipe.ingredients
    };

    if (this.isEdit && this.recipeId) {
      this.recipeService.update(this.recipeId, payload).subscribe({
        next: () => this.router.navigate(['/recipes']),
        error: (err) => (this.errorMessage = err.error?.error || 'Update failed')
      });
    } else {
      this.recipeService.create(payload).subscribe({
        next: () => this.router.navigate(['/recipes']),
        error: (err) => (this.errorMessage = err.error?.error || 'Create failed')
      });
    }
  }
}
