import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

interface Property {
  id: number;
  location: string;
  area: string;
  price: number;
  type: string;
  beds: number;
  baths: number;
  garage: number;
  forSale: boolean;
  image: string;
}

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Property[] = [];
  
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
      return;
    }
    
    // For demo purposes, we'll populate with some mock data
    // In a real app, you would fetch the user's favorites from a service
    this.favorites = [
      {
        id: 1,
        location: 'Cairo',
        area: 'El-Sherouk',
        price: 345000,
        type: 'Villa',
        beds: 4,
        baths: 3,
        garage: 1,
        forSale: true,
        image: 'villa.jpg'
      },
      {
        id: 3,
        location: 'Cairo',
        area: 'Maadi',
        price: 220000,
        type: 'Apartment',
        beds: 3,
        baths: 2,
        garage: 1,
        forSale: false,
        image: 'apartment.avif'
      }
    ];
  }
  viewProperty(propertyId: number): void {
    // For now, show a message that this feature is coming soon
    Swal.fire({
      icon: 'info',
      title: 'Coming Soon',
      text: 'Property details view will be available in a future update.',
      confirmButtonColor: '#08227B'
    });
    
    // Later, when you implement the property-detail component:
    // this.router.navigate(['/property', propertyId]);
  }
  
  
  removeFromFavorites(propertyId: number): void {
    Swal.fire({
      title: 'Remove from favorites?',
      text: 'This property will be removed from your favorites',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08227B',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the property from favorites
        this.favorites = this.favorites.filter(property => property.id !== propertyId);
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Removed from favorites',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
  
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}