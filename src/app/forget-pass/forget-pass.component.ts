import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ForgetPassComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required, this.validateEmailOrPhone]]
    });
  }

  // Custom validator for email or phone number
  validateEmailOrPhone(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    // Check if it's an email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Check if it's a phone number (simple check for numbers, could be more complex)
    const phonePattern = /^\+?\d{10,15}$/;
    
    if (!value) {
      return null; // Let required validator handle empty values
    }
    
    if (emailPattern.test(value) || phonePattern.test(value)) {
      return null; // Valid format
    }
    
    return { invalidFormat: true }; // Invalid format
  }

  // Getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // TODO: Implement actual forgot password logic here
    console.log('Forgot password form submitted', this.forgotPasswordForm.value);
    
    // Navigate to OTP verification page
    this.router.navigate(['/otp-verification'], { 
      queryParams: { contact: this.forgotPasswordForm.value.emailOrPhone } 
    });
  }
}