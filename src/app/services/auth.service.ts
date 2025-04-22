// src/app/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // رابط API الأساسي
  private baseUrl = 'http://digitalpropertyapi.runasp.net/api';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // طريقة تسجيل الدخول
  login(loginData: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/login`, loginData);
  }

  // طريقة التسجيل
  register(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/signup`, registerData);
  }

  // نسيت كلمة المرور
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/forgot-password`, { email });
  }

  // إرسال رمز OTP
  resendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/resend-otp`, { email });
  }

  // التحقق من رمز OTP
  verifyOtp(data: { email: string, otp: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/verify-otp`, data);
  }

  // إعادة تعيين كلمة المرور
  resetPassword(resetData: { email: string, newPassword: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/reset-password`, resetData);
  }

  // تخزين بيانات المستخدم في localStorage بطريقة آمنة
  storeUserData(token: string, userData: any): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  // الحصول على التوكن بطريقة آمنة
  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // الحصول على بيانات المستخدم بطريقة آمنة
  getUserData(): any {
    if (this.isBrowser) {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        try {
          return JSON.parse(userDataString);
        } catch (e) {
          console.error('خطأ في تحليل بيانات المستخدم', e);
          return null;
        }
      }
    }
    return null;
  }

  // التحقق مما إذا كان المستخدم مسجل الدخول
  isLoggedIn(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // تسجيل الخروج
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
  }
  
  // تخزين بريد إعادة التعيين بطريقة آمنة
  storeResetEmail(email: string): void {
    if (this.isBrowser) {
      localStorage.setItem('resetEmail', email);
    }
  }
  
  // الحصول على بريد إعادة التعيين
  getResetEmail(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('resetEmail');
    }
    return null;
  }
  
  // إزالة بريد إعادة التعيين
  removeResetEmail(): void {
    if (this.isBrowser) {
      localStorage.removeItem('resetEmail');
    }
  }
}