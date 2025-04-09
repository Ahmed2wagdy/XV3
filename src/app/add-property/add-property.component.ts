import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // User is not authenticated, redirect to login page
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please log in to access this page',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/log-in']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}