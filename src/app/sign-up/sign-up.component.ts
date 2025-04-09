import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;

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
    
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+20', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      city: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  // Custom validator for password matching
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matching: true });
      return { matching: true };
    }
    return null;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    // For demo purposes, we'll simulate a successful registration
    // In a real app, you would call your registration service here
    
    // Get the form values
    const formValues = this.signupForm.value;
    
    // Create a user data object from form values
    const userData = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID for demo
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: `${formValues.countryCode}${formValues.phone}`,
      city: formValues.city,
      dob: formValues.dob
      // We don't store the password in localStorage for security reasons
    };
    
    // Store user data in local storage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', 'new-user-jwt-token');
    
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: 'Your account has been created!',
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

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signupWithGoogle(): void {
    // Simulate Google signup
    const userData = {
      id: Math.floor(Math.random() * 1000),
      firstName: 'Google',
      lastName: 'User',
      email: 'google-user@gmail.com',
      // Add any other default data for Google users
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', 'google-signup-jwt-token');
    
    Swal.fire({
      icon: 'success',
      title: 'Google Signup Successful',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}