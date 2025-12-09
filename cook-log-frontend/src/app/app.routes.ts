import { Routes } from '@angular/router';
import { RecipeList } from './recipes/recipe-list/recipe-list';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeList }
];
