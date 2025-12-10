import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recipes/create', component: RecipeFormComponent },
    { path: 'recipes/edit/:id', component: RecipeFormComponent },
    { path: '**', redirectTo: 'recipes' }
];
