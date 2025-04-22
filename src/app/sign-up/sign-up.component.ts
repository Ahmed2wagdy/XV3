// src/app/sign-up/sign-up.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      city: ['', Validators.required],
      birthOfDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      isTermsAccepted: [true, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    
    this.isLoading = true;
    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'تم التسجيل بنجاح',
          text: 'يمكنك الآن تسجيل الدخول'
        });
        this.router.navigate(['/log-in']);
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'فشل التسجيل',
          text: error.error?.message || 'حدث خطأ أثناء التسجيل'
        });
      }
    });
  }
}