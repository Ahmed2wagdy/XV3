import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // User is already logged in, redirect to dashboard
      this.router.navigate(['/dashboard']);
      return;
    }
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // For demo purposes, we'll simulate a successful login
    // In a real app, you would call your authentication service here
    
    // Create a mock user data object
    const userData = {
      id: 1,
      email: this.loginForm.value.email,
      firstName: 'Ahmed',
      lastName: 'User',
      // Add any other user data you need
    };
    
    // Store user data in local storage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', 'mock-jwt-token');
    
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome back!',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle(): void {
    // Simulate Google login 
    const userData = {
      id: 2,
      email: 'google-user@gmail.com',
      firstName: 'Google', 
      lastName: 'User',
      // Add any other user data you need
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', 'mock-google-jwt-token');
    
    Swal.fire({
      icon: 'success',
      title: 'Google Login Successful',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}