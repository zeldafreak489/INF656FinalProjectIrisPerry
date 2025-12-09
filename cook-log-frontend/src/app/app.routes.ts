import { Routes } from '@angular/router';
import { RecipeList } from './recipes/recipe-list/recipe-list';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'recipes', component: RecipeList },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
