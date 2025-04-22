// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  userName = 'User';
  properties = []; // البيانات هنا

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // التحقق من تسجيل الدخول
    if (!this.authService.isLoggedIn()) {
      Swal.fire({
        icon: 'warning',
        title: 'تسجيل الدخول مطلوب',
        text: 'يرجى تسجيل الدخول للوصول إلى هذه الصفحة',
        timer: 2000
      });
      this.router.navigate(['/log-in']);
      return;
    }

    // الحصول على بيانات المستخدم
    const userData = this.authService.getUserData();
    if (userData) {
      if (userData.firstName && userData.lastName) {
        this.userName = `${userData.firstName} ${userData.lastName}`;
      } else if (userData.firstName) {
        this.userName = userData.firstName;
      }
    }

    // هنا يمكنك جلب البيانات من API
    // this.propertyService.getProperties().subscribe(...)
  }

  logout() {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'سيتم تسجيل خروجك من الحساب',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، تسجيل الخروج',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
}