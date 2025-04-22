import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestComponent } from './guest.component';
import { FormsModule } from '@angular/forms';

describe('GuestComponent', () => {
  let component: GuestComponent;
  let fixture: ComponentFixture<GuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestComponent, FormsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(GuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with properties', () => {
    expect(component.properties.length).toBeGreaterThan(0);
    expect(component.filteredProperties.length).toEqual(component.properties.length);
  });

  it('should filter properties by type', () => {
    // Test filter by Villa
    component.filterByType('Villa');
    expect(component.selectedFilter).toBe('Villa');
    expect(component.filteredProperties.every(p => p.type === 'Villa')).toBeTruthy();
    
    // Test All filter
    component.filterByType('All');
    expect(component.selectedFilter).toBe('All');
    expect(component.filteredProperties.length).toEqual(component.properties.length);
  });

  it('should search properties', () => {
    component.searchQuery = 'cairo';
    component.searchProperties();
    expect(component.filteredProperties.length).toBeGreaterThan(0);
    expect(component.filteredProperties.every(p => 
      p.location.toLowerCase().includes('cairo') || 
      p.area.toLowerCase().includes('cairo') || 
      p.type.toLowerCase().includes('cairo')
    )).toBeTruthy();
  });
});