export interface Recipe {
  _id?: string;
  title: string;
  description?: string;
  instructions: string;
  ingredients: string[] | string; // array for backend, string for form
  image?: string;
  status?: string;
  prepTimeMinutes?: number;
  servings?: number;
}
