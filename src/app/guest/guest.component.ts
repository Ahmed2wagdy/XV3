import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
  selector: 'app-guest',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  selectedFilter: string = 'All';
  searchQuery: string = '';
  
  constructor() { }

  ngOnInit(): void {
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
    Swal.fire({ 
      title: "Login first", 
      text: "You need to login to continue",
      icon: "info" 
    });
    
    // This would be implemented with a service once user authentication is in place
  }
  
  // Method to handle view property
  viewProperty(propertyId: number): void {
    Swal.fire({ 
      title: "Login first", 
      text: "You need to login to continue",
      icon: "info" 
    });
    
    // This would be implemented with a service and routing once user authentication is in place
  }
  
  // Method for accessing restricted features
  showLoginAlert(): void {
    Swal.fire({ 
      title: "Login first", 
      text: "You need to login to continue",
      icon: "info" 
    });
  }
}