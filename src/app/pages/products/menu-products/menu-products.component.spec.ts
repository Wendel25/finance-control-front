import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProductsComponent } from './menu-products.component';

describe('MenuProductsComponent', () => {
  let component: MenuProductsComponent;
  let fixture: ComponentFixture<MenuProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
