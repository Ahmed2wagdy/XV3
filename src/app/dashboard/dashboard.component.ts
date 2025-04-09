import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Property {
  id: number;
  location: string;
  area: string;
  price: number;
  type: 'Villa' | 'Apartment' | 'House' | 'Office' | 'Roof';
  beds: number;
  baths: number;
  garage: number;
  forSale: boolean;
  image: string;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  selectedFilter: string = 'All';
  searchQuery: string = '';
  userName: string = 'User'; // Default username, will be updated in ngOnInit
  
  constructor(private router: Router) { }

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
  
    // Get user info from local storage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        if (userData.firstName && userData.lastName) {
          this.userName = `${userData.firstName} ${userData.lastName}`;
        } else if (userData.firstName) {
          this.userName = userData.firstName;
        } else if (userData.name) {
          this.userName = userData.name;
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage', e);
      }
    }
    
    // Initialize with mock data
    this.properties = [
      {
        id: 1,
        location: 'cairo',
        area: 'el-sherouk',
        price: 345000,
        type: 'Villa',
        beds: 9,
        baths: 2,
        garage: 1,
        forSale: true,
        image: 'villa.jpg',
        isFavorite: false
      },
      {
        id: 2,
        location: 'cairo',
        area: 'el-sherouk',
        price: 345000,
        type: 'Apartment',
        beds: 9,
        baths: 2,
        garage: 1,
        forSale: false,
        image: 'apartment.avif',
        isFavorite: false
      },
      {
        id: 3,
        location: 'cairo',
        area: 'el-sherouk',
        price: 345000,
        type: 'Roof',
        beds: 9,
        baths: 2,
        garage: 1,
        forSale: true,
        image: 'roof.jpeg',
        isFavorite: false
      },
      {
        id: 4,
        location: 'cairo',
        area: 'el-sherouk',
        price: 345000,
        type: 'Villa',
        beds: 9,
        baths: 2,
        garage: 1,
        forSale: true,
        image: 'villa.jpg',
        isFavorite: false
      },
      {
        id: 5,
        location: 'cairo',
        area: 'el-sherouk',
        price: 345000,
        type: 'House',
        beds: 9,
        baths: 2,
        garage: 1,
        forSale: true,
        image: 'home.jpeg',
        isFavorite: false
      },
      {
        id: 6,
        location: 'cairo',
        area: 'el-sherouk',
        price: 345000,
        type: 'Office',
        beds: 9,
        baths: 2,
        garage: 1,
        forSale: false,
        image: 'office.jpg',
        isFavorite: false
      }
    ];
    
    // Initialize filtered properties
    this.filteredProperties = [...this.properties];
  }

  // Method to filter properties by type
  filterByType(type: string): void {
    this.selectedFilter = type;
    
    if (type === 'All') {
      this.filteredProperties = [...this.properties];
    } else {
      this.filteredProperties = this.properties.filter(
        property => property.type.toLowerCase() === type.toLowerCase()
      );
    }
  }

  // Method to search properties
  searchProperties(): void {
    if (!this.searchQuery.trim()) {
      this.filterByType(this.selectedFilter); // Reset to current filter if search is empty
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    let propertiesPool = this.properties;
    
    // Apply type filter first if not 'All'
    if (this.selectedFilter !== 'All') {
      propertiesPool = this.properties.filter(
        property => property.type.toLowerCase() === this.selectedFilter.toLowerCase()
      );
    }
    
    // Then apply search filter
    this.filteredProperties = propertiesPool.filter(property => 
      property.location.toLowerCase().includes(query) ||
      property.area.toLowerCase().includes(query) ||
      property.type.toLowerCase().includes(query)
    );
  }

  // Method to toggle favorite 
  toggleFavorite(propertyId: number): void {
    const property = this.properties.find(p => p.id === propertyId);
    if (property) {
      property.isFavorite = !property.isFavorite;
      
      // Show success message 
      Swal.fire({
        position: "top-end",
        icon: property.isFavorite ? "success" : "info",
        title: property.isFavorite ? "Added to favorites" : "Removed from favorites",
        showConfirmButton: false,
        timer: 1500
      });
      
      // In a real app, you would call a service to update the favorite status in the backend
    }
  }
  
  // Method to handle view property
  viewProperty(propertyId: number): void {
    // Navigate to property details page
    this.router.navigate(['/property', propertyId]);
    
    // In a real implementation, this would route to a property detail page
  }
  
  // Logout method
  logout(): void {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#08227B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear local storage
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        
        // Redirect to guest page
        this.router.navigate(['/']);
        
        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}