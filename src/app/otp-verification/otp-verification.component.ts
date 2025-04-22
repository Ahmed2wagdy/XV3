// src/app/otp-verification/otp-verification.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html'
})
export class OtpVerificationComponent {
  otpForm: FormGroup;
  email: string;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // الحصول على البريد الإلكتروني من localStorage أو من الخدمة
    this.email = localStorage.getItem('resetEmail') || '';
    
    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit5: ['', [Validators.required, Validators.pattern('^[0-9]$')]]
    });
  }

  onSubmit() {
    if (this.otpForm.invalid) return;
    
    const { digit1, digit2, digit3, digit4, digit5 } = this.otpForm.value;
    const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}`;
    
    this.isLoading = true;
    this.authService.verifyOtp(this.email, otp).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/reset-password']);
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التحقق',
          text: error.error?.message || 'رمز التحقق غير صحيح'
        });
      }
    });
  }

  resendOtp() {
    this.isLoading = true;
    this.authService.resendOtp(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'تم إرسال رمز جديد',
          text: 'تحقق من بريدك الإلكتروني'
        });
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'فشل إرسال الرمز',
          text: error.error?.message || 'حدث خطأ أثناء إرسال رمز جديد'
        });
      }
    });
  }
}