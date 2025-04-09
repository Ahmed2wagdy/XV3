import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

    // TODO: Implement actual signup logic here
    console.log('Signup form submitted', this.signupForm.value);
    
    // Mock successful signup, navigate to login or dashboard
    // this.router.navigate(['/log-in']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signupWithGoogle(): void {
    // TODO: Implement Google signup logic
    console.log('Google signup clicked');
  }
}