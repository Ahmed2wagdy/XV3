// src/app/log-in/log-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html'
})
export class LogInComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // تخزين التوكن وبيانات المستخدم
        this.authService.saveToken(response.token);
        this.authService.saveUserData(response.user);
        
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الدخول بنجاح',
          timer: 1500,
          showConfirmButton: false
        });
        
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'فشل تسجيل الدخول',
          text: error.error?.message || 'بريد إلكتروني أو كلمة مرور غير صحيحة'
        });
      }
    });
  }
}