# Cook Log Project

A full-stack recipe management web application built with Angular, Node.js, Express, and MongoDB. Users can view recipes publicly, while authenticated users can create, edit, and delete recipes.  

---

## **Prerequisites**

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)  
- [Angular CLI](https://angular.io/cli) (v16 or higher)  
- [MongoDB](https://www.mongodb.com/) (Atlas or local installation)  
- npm (comes with Node.js)  

---

## **Backend Setup**

### 1. Navigate to the backend directory
```bash
cd cook-log-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a .env file in the cook-log-backend root directory with the following variables:
```
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
FRONTEND_ORIGIN=http://localhost:4200
PORT=3000
```
* MONGODB_URI: MongoDB connection string (Atlas or local)
* JWT_SECRET: Secret key for signing JWT tokens
* FRONTEND_ORIGIN: URL of your frontend (default is Angular dev server)
* PORT: Backend server port (default 3000)

### 4. Start the backend server
```bash
npm run start
```
The server should be running at http://localhost:3000

API Endpoints:
* Auth:
    * POST /api/auth/register - Register new user
    * POST /api/auth/login - Login existing user
* Recipes:
    * GET /api/recipes - Get all recipes (public)
    * GET /api/recipes/:id - Get a single recipe by ID (public)
    * POST /api/recipes - Create a recipe (authenticated)
    * PUT /api/recipes/:id - Update a recipe (authenticated)
    * DELETE /api/recipes/:id - Delete a recipe (authenticated)

## **Frontend Setup**

### 1. Navigate to the frontend directory
```bash
cd cook-log-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API URL
By default, the frontend uses http://localhost:3000/api as the backend URL.
If you change the backend URL or port, update it in the services:
* src/app/services/recipe.service.ts -> this.apiUrl = '<backend_url>/api/recipes'
* src/app/services/auth.service.ts -> ensure any URLs match your backend

### 4. Start the Angular development server
```bash
ng serve
```

### Usage
1. Navigate to http://localhost:4200
2. View all recipes publicly
3. Register or log in to create, edit, or delete recipes
4. Navigate through the app using the header links

### Project Structure
#### Backend (cook-log-backend)
* server.js - Entry point for the Express server
* routes/ - Route definitions (auth, recipes)
* models/ - Mongoose schemas
* controllers/ - Business logic
* .env - Environment variables

#### Frontend (cook-log-frontend)
* src/app/components/ - Angular components (recipes, auth, layout)
* src/app/services/ - Services for API communication
* src/app/layout/ - Header, footer, navigation
* src/app/app.routes.ts - Angular routing configuration

### Notes
* Recipes are stored in MongoDB. Make sure your database is running.
* Only authenticated users can modify recipes; viewing is public
* JWT tokens are store in localStorage for session persistence.

### Author
Iris Perry