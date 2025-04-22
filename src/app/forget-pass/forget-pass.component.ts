// src/app/forget-pass/forget-pass.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [AuthService]
})
export class ForgetPassComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    // تهيئة النموذج في المُنشئ
    this.forgotPasswordForm = this.formBuilder.group({
      emailOrPhone: ['', [Validators.required, Validators.email]] // API يتوقع بريد إلكتروني فقط
    });
  }

  ngOnInit(): void {
    // تم نقل كل المنطق إلى المُنشئ لتجنب مشاكل SSR
  }

  get f() { return this.forgotPasswordForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const email = this.forgotPasswordForm.get('emailOrPhone')?.value;
    
    // تخزين البريد الإلكتروني للاستخدام في خطوات التحقق التالية
    // نستخدم الدالة الآمنة من AuthService بدلاً من localStorage مباشرة
    this.authService.setResetEmail(email);

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // التحقق من الاستجابة
        if (response && response.status === 'Error') {
          Swal.fire({
            icon: 'error',
            title: 'فشلت العملية',
            text: response.message || 'فشل في إرسال رمز التحقق.'
          });
          return;
        }
        
        // في حالة النجاح
        Swal.fire({
          icon: 'success',
          title: 'تم إرسال رمز التحقق',
          text: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني.',
          confirmButtonText: 'التحقق من الرمز'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/otp-verification']);
          } else {
            // حتى إذا لم ينقر المستخدم على الزر، قم بتوجيهه إلى صفحة التحقق من OTP
            this.router.navigate(['/otp-verification']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        
        let errorMessage = 'فشل في إرسال رمز التحقق. يرجى المحاولة مرة أخرى.';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        
        Swal.fire({
          icon: 'error',
          title: 'فشلت العملية',
          text: errorMessage
        });
      }
    });
  }
}