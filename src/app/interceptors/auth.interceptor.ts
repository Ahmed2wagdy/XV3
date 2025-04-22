// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // الحصول على التوكن من التخزين المحلي
    const token = localStorage.getItem('token');
    
    // نسخ الطلب وإضافة التوكن إذا كان موجودًا
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    // تمرير الطلب المعدل إلى المعالج التالي
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // التعامل مع أخطاء 401 غير مصرح به (التوكن منتهي الصلاحية أو غير صالح)
        if (error.status === 401) {
          // مسح localStorage وإعادة التوجيه إلى صفحة تسجيل الدخول
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          this.router.navigate(['/log-in']);
        }
        
        return throwError(() => error);
      })
    );
  }
}

// دالة مساعدة لـ Angular's withInterceptors
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // الحصول على التوكن من التخزين المحلي
  const token = localStorage.getItem('token');
  
  // نسخ الطلب وإضافة التوكن إذا كان موجودًا
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  // تمرير الطلب المعدل إلى المعالج التالي
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // التعامل مع أخطاء 401 غير مصرح به (التوكن منتهي الصلاحية أو غير صالح)
      if (error.status === 401) {
        // مسح localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        // نحتاج إلى جهاز توجيه للتنقل، لكن لا يمكن حقنه مباشرة
        // يمكن استخدام خدمة أو محاولة العثور على طريقة أخرى للتعامل مع هذا
        window.location.href = '/log-in';
      }
      
      return throwError(() => error);
    })
  );
};