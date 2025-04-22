// src/app/interceptors/logging.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // تسجيل تفاصيل الطلب
    console.group('HTTP Request');
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Request Headers:', request.headers);
    console.log('Request Body:', request.body);
    console.groupEnd();

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // تسجيل تفاصيل الاستجابة
          console.group('HTTP Response');
          console.log('Response URL:', event.url);
          console.log('Response Status:', event.status);
          console.log('Response Status Text:', event.statusText);
          console.log('Response Headers:', event.headers);
          console.log('Response Body:', event.body);
          console.groupEnd();
        }
      })
    );
  }
}

// دالة مساعدة لـ Angular's withInterceptors
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // تسجيل تفاصيل الطلب
  console.group('HTTP Request');
  console.log('Request URL:', req.url);
  console.log('Request Method:', req.method);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  console.groupEnd();

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        // تسجيل تفاصيل الاستجابة
        console.group('HTTP Response');
        console.log('Response URL:', event.url);
        console.log('Response Status:', event.status);
        console.log('Response Status Text:', event.statusText);
        console.log('Response Headers:', event.headers);
        console.log('Response Body:', event.body);
        console.groupEnd();
      }
    })
  );
};