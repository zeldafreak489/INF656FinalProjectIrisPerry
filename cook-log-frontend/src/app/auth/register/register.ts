import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        // Optionally log in immediately after registration
        localStorage.setItem('token', res.token);
        this.router.navigate(['/recipes']);
      },
      
      error: (err) => {
        if (err.error?.errors && err.error.errors.length > 0) {
          // Show first validator error from backend (e.g., password too short)
          this.errorMessage = err.error.errors[0].msg;
        } else if (err.error?.error) {
          // For custom backend errors like "User already exists"
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'Registration failed';
        }
      }
    });
  }
}
