// src/app/reset-password/reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]  ,
  providers: [AuthService]
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  isLoading = false;
  email: string = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    // تهيئة نموذج إعادة تعيين كلمة المرور في المُنشئ
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    // الحصول على البريد الإلكتروني المخزن بطريقة آمنة
    this.email = this.authService.getResetEmail(this.email) || '';
    
    if (!this.email) {
      // إذا لم يتم العثور على بريد إلكتروني، إعادة التوجيه إلى صفحة نسيت كلمة المرور
      this.router.navigate(['/forget-pass']);
      return;
    }
  }

  // دالة للتحقق من تطابق كلمات المرور
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { matching: true };
  }

  get f() { return this.resetForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.resetForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    const resetData = {
      email: this.email,
      newPassword: this.resetForm.value.password,
      confirmPassword: this.resetForm.value.confirmPassword
    };

    this.authService.resetPassword(resetData.email, resetData.newPassword, resetData.confirmPassword).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // تحقق من الاستجابة
        if (response && response.status === 'Error') {
          Swal.fire({
            icon: 'error',
            title: 'فشلت إعادة تعيين كلمة المرور',
            text: response.message || 'فشل في إعادة تعيين كلمة المرور.'
          });
          return;
        }
        
        // إزالة البريد الإلكتروني من التخزين المحلي بطريقة آمنة
        this.authService.removeResetEmail();
        
        Swal.fire({
          icon: 'success',
          title: 'تم إعادة تعيين كلمة المرور بنجاح',
          text: 'تم إعادة تعيين كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.',
          showConfirmButton: true,
          confirmButtonText: 'تسجيل الدخول'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/log-in']);
          } else {
            // حتى إذا لم ينقر المستخدم على زر التأكيد، قم بتوجيهه إلى صفحة تسجيل الدخول
            this.router.navigate(['/log-in']);
          }
        });
      },
      error: (err) => {
        this.isLoading = false;
        
        let errorMessage = 'فشل في إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        
        Swal.fire({
          icon: 'error',
          title: 'فشلت إعادة تعيين كلمة المرور',
          text: errorMessage
        });
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}